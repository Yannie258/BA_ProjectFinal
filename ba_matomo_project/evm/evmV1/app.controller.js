const logger = require('../modules/logger');
const matomo = require('../modules/matomo');
const appService = require('./app.service');

module.exports = {
    
    get_overview_kpis: async (period) => {
        console.log("get get_overview_kpis...");
        try {
            let currentRange = appService.get_date_ranges(period)[0];
            let lastRange = appService.get_date_ranges(period)[1];

            //get visit data
            let visitData = {
                current: await matomo.getData("&method=VisitsSummary.get&period=range&date=" + currentRange),
                last: await matomo.getData("&method=VisitsSummary.get&period=range&date=" + lastRange),
            };
            //get page data
            let pageData = {
                current: await matomo.getData("&method=Actions.get&period=range&date=" + currentRange),
                last: await matomo.getData("&method=Actions.get&period=range&date=" + lastRange),
            };
            //get event data
            let eventData = {
                current: await matomo.getData("&method=Events.getAction&period=range&date=" + currentRange),
                last: await matomo.getData("&method=Events.getAction&period=range&date=" + lastRange),
            };

            let tableResult = [];
            tableResult.push({ 
                KPI: "Besuche insgesamt", 
                Wert: visitData.current["nb_visits"], 
                Entwicklung: appService.calc_performance(visitData.last["nb_visits"], visitData.current["nb_visits"]), 
                EntwicklungWert: appService.calc_performance_absolute(visitData.last["nb_visits"], visitData.current["nb_visits"])
            });

            let pageDurationInSec = appService.calc_performance_absolute(visitData.last["avg_time_on_site"], visitData.current["avg_time_on_site"]);
            tableResult.push({ 
                KPI: "Durchschnittliche Verweildauer", 
                Wert: appService.seconds_to_timestring(visitData.current["avg_time_on_site"]), 
                Entwicklung: appService.calc_performance(visitData.last["avg_time_on_site"], visitData.current["avg_time_on_site"]), 
                EntwicklungWert: (["-","+"].indexOf(pageDurationInSec[0]) > -1 ? pageDurationInSec[0] : "") + appService.seconds_to_timestring(pageDurationInSec)
            });
            tableResult.push({ 
                KPI: "Gefällt-mir-Angaben", 
                Wert: eventData.current.find(p => p.label === "Like")["nb_events"], 
                Entwicklung: appService.calc_performance(eventData.last.find(p => p.label === "Like")["nb_events"], eventData.current.find(p => p.label === "Like")["nb_events"]), 
                EntwicklungWert: appService.calc_performance_absolute(eventData.last.find(p => p.label === "Like")["nb_events"], eventData.current.find(p => p.label === "Like")["nb_events"])
            });
            tableResult.push({ 
                KPI: "Kommentare", 
                Wert: eventData.current.find(p => p.label === "Comment")["nb_events"], 
                Entwicklung: appService.calc_performance(eventData.last.find(p => p.label === "Comment")["nb_events"], eventData.current.find(p => p.label === "Comment")["nb_events"]), 
                EntwicklungWert: appService.calc_performance_absolute(eventData.last.find(p => p.label === "Comment")["nb_events"], eventData.current.find(p => p.label === "Comment")["nb_events"])
            });
            // tableResult.push({ KPI: "Veröffentlichte Blogbeiträge", Wert: 100, Entwicklung: "-" });
            tableResult.push({ 
                KPI: "Seitenansichten insgesamt", 
                Wert: pageData.current["nb_pageviews"], 
                Entwicklung: appService.calc_performance(pageData.last["nb_pageviews"], pageData.current["nb_pageviews"]), 
                EntwicklungWert: appService.calc_performance_absolute(pageData.last["nb_pageviews"], pageData.current["nb_pageviews"])
            });

            return { 
                title: "Zeitraum: " + currentRange.split(',').join(" - "),
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_overview_kpis: " + err);
        }
    },

    get_homepages: async (period, limit) => {
        console.log("get get_homepages...");
        try {
            let currentRange = appService.get_date_ranges(period)[0];
            let lastRange = appService.get_date_ranges(period)[1];

            let dataFirstLevelCurr = await matomo.getData("&method=Actions.getPageUrls" + "&period=range&date=" + currentRange);
            let sidCurr = 0;
            for(let i = 0; i < dataFirstLevelCurr.length; i++){
                if(dataFirstLevelCurr[i]["label"] === "home"){
                    sidCurr = dataFirstLevelCurr[i]["idsubdatatable"];
                    break;
                }
            }

            let dataFirstLevelLast = await matomo.getData("&method=Actions.getPageUrls" + "&period=range&date=" + lastRange);
            let sidLast = 0;
            for(let i = 0; i < dataFirstLevelLast.length; i++){
                if(dataFirstLevelLast[i]["label"] === "home"){
                    sidLast = dataFirstLevelLast[i]["idsubdatatable"];
                    break;
                }
            }

            //get custom dimension data (page title)
            let cd_pagetitle = {
                current: await matomo.getData("&method=Actions.getPageUrls&idSubtable="+ sidCurr +"&period=range&date=" + currentRange),
                last: await matomo.getData("&method=Actions.getPageUrls&idSubtable="+ sidLast +"&period=range&date=" + lastRange),
            };

            let tableResult = [];
            let addedResults = 0;
            cd_pagetitle.current.sort((a, b) => (a.nb_hits < b.nb_hits) ? 1 : ((b.nb_hits < a.nb_hits) ? -1 : 0));
            
            for(let i = 0; i < cd_pagetitle.current.length; i++){
                let label = appService.format_string_capitalizeFirstLetter(cd_pagetitle.current[i].label.replace('/','').replace(/-/g,' '));
                let hitsCurrent = cd_pagetitle.current[i].nb_hits;
                let hitsLast = cd_pagetitle.last.filter((p) => p.label === cd_pagetitle.current[i].label).length > 0 ? cd_pagetitle.last.filter((p) => p.label === cd_pagetitle.current[i].label)[0].nb_hits : 0;
                
                let shortLabel = label;
                shortLabel = shortLabel.length > 50 ? shortLabel.substr(0,50) + " [...]" : shortLabel;
                
                tableResult.push({ 
                    Aufrufe: hitsCurrent, 
                    Seitentitel: shortLabel, 
                    Entwicklung: appService.calc_performance(hitsCurrent, hitsLast),
                    EntwicklungWert: appService.calc_performance_absolute(hitsCurrent, hitsLast),
                });
                addedResults++;
                if(addedResults >= limit){break;}
            }

            return { 
                title: "Startseiten:",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_homepages: " + err);
        }
    },

    get_pageviews: async (period, limit) => {
        console.log("get get_pageviews...");
        try {
            let currentRange = appService.get_date_ranges(period)[0];
            let lastRange = appService.get_date_ranges(period)[1];

            //get custom dimension data (page title)
            let cd_pagetitle = {
                current: await matomo.getData("&method=CustomDimensions.getCustomDimension&idDimension="+ "2" +"&period=range&date=" + currentRange),
                last: await matomo.getData("&method=CustomDimensions.getCustomDimension&idDimension="+ "2" +"&period=range&date=" + lastRange),
            };
            cd_pagetitle.current = cd_pagetitle.current.sort((a, b) => (a.nb_hits < b.nb_hits) ? 1 : ((b.nb_hits < a.nb_hits) ? -1 : 0));
            
            let tableResult = [];

            let addedResults = 0;
            for(let i = 0; i < cd_pagetitle.current.length; i++){
                let label = cd_pagetitle.current[i].label;
                let hitsCurrent = cd_pagetitle.current[i].nb_hits;
                let hitsLast = cd_pagetitle.last.filter((p) => p.label === label).length > 0 ? cd_pagetitle.last.filter((p) => p.label === label)[0].nb_hits : 0;
                
                let shortLabel = label;
                shortLabel = shortLabel.length > 50 ? shortLabel.substr(0,50) + " [...]" : shortLabel;

                tableResult.push({ 
                    Aufrufe: hitsCurrent, 
                    Seitentitel: shortLabel, 
                    Entwicklung: appService.calc_performance(hitsCurrent, hitsLast),
                    EntwicklungWert: appService.calc_performance_absolute(hitsCurrent, hitsLast),
                });
                addedResults++;
                if(addedResults >= limit){break;}
            }

            return { 
                title: "Häufigsten Seitenaufrufe:",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_pageviews: " + err);
        }
    },

    get_searchs: async (period, limit) => {
        console.log("get get_searchs...");
        try {
            let tableResult = [];
            let currentRange = appService.get_date_ranges(period)[0];
            let data = await matomo.getData("&method=Actions.getSiteSearchKeywords&period=range&date=" + currentRange + "&limit=" + limit);

            let addedResults = 0;
            let maxResults = limit;
            for(let i = 0; i < data.length; i++){
                let ranking = i + 1;
                let keyword = data[i].label;
                let requests = data[i].nb_hits || 0;

                let shortLabel = keyword;
                shortLabel = shortLabel.length > 50 ? shortLabel.substr(0,50) + " [...]" : shortLabel;

                tableResult.push({ 
                    Platz: ranking, 
                    Suchwort: shortLabel, 
                    Suchanfragen: requests
                });
                addedResults++;
                if(addedResults >= maxResults){break;}
            }

            return { 
                title: "Top-10-Suchbegriffe:",
                data: tableResult
            };
        }catch (err) {
            logger.error("Error in function get_searchs: " + err);
        }
    },

    get_top_articles: async (period, limit) => {
        console.log("get get_top_articles...");
        try {
            let tableResult = [];
            let currentRange = appService.get_date_ranges(period)[0];

            // 1. get id from "Inhaltstitel"
            var data = await matomo.getData("&method=CustomDimensions.getCustomDimension&scopeOfDimension=action&idDimension=5&showtitle=1&filter_sort_column=nb_hits&filter_sort_order=desc&date=" + currentRange + "&period=range&filter_limit=" + limit);
            var subId = 0;
            data = data.sort((a, b) => (a.nb_hits < b.nb_hits) ? 1 : ((b.nb_hits < a.nb_hits) ? -1 : 0));

            for (var a = 0; a < data.length && a < limit; a++) {
                subId = data[a]["idsubdatatable"];
                
                //# web traffic
                var visits = 0;
                var data2 = await matomo.getData("&method=CustomDimensions.getCustomDimension&scopeOfDimension=action&idDimension=2&showtitle=1&filter_sort_column=nb_hits&filter_sort_order=desc&date=" + currentRange + "&period=range&filter_limit=" + limit + "&filter_column=label&filter_pattern=(view%2F........-....-....-....-............)$&idSubtable=" + subId);
                for (var b = 0; b < data2.length && b < limit; b++) {
                    var parts = data2[b]["label"].split('/');
                    articleId = encodeURI(parts[parts.length - 1]); //get last part from url string
            
                    // test id:
                    var regex = RegExp('........-....-....-....-............');

                    var testesdIdIsValid = regex.test(articleId);
                    if (!testesdIdIsValid) articleId = "";

                    //get metrics
                    if (data2[b]["url"]) {
                        var data3 = await matomo.getData("&method=Actions.getPageUrl&&date=" + currentRange + "&period=range&pageUrl=" + data2[b]["url"].replace('pia.evm.de', ''));
                        data3 = data3.sort((a, b) => (a.nb_visits < b.nb_visits) ? 1 : ((b.nb_visits < a.nb_visits) ? -1 : 0));
                    }

                    //add only the first url if there are more than one:
                    if (data3.length > 0) {
                        visits = parseInt(data3[0]["nb_visits"]);
                        articleUrl = decodeURI(data3[0]["url"]);
                        break;
                        //console.log(articleUrl);
                    } else {
                        visits = 0;
                        articleUrl = "";
                    }
                }

                let shortLabel = data[a]["label"];
                shortLabel = shortLabel.length > 50 ? shortLabel.substr(0,50) + " [...]" : shortLabel;

                let record = { 
                    Beitrag: shortLabel, 
                    Besuche: visits
                };
                tableResult.push(record);
            }

            tableResult = tableResult.sort((a, b) => (a.Besuche < b.Besuche) ? 1 : ((b.Besuche < a.Besuche) ? -1 : 0));
            for(let i = 0; i < tableResult.length; i++) {
                tableResult[i].Platz = i + 1;
            }

            return { 
                title: "Top-10-Artikel",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_top_articles: " + err);
        }
    },

    get_top_rooms: async (period, limit) => {
        console.log("get get_top_rooms...");
        try {
            let tableResult = [];
            let currentRange = appService.get_date_ranges(period)[0];

            let dataFirstLevel = await matomo.getData("&method=Actions.getPageUrls" + "&period=range&date=" + currentRange);
            let sid = 0;
            for(let i = 0; i < dataFirstLevel.length; i++){
                if(dataFirstLevel[i]["label"] === "workspaces"){
                    sid = dataFirstLevel[i]["idsubdatatable"];
                    break;
                }
            }

            let data = await matomo.getData("&method=Actions.getPageUrls&idSubtable=" + sid + "&period=range&date=" + currentRange + "&limit=" + limit);
            data = data.sort((a, b) => (a.nb_hits < b.nb_hits) ? 1 : ((b.nb_hits < a.nb_hits) ? -1 : 0));
            
            let addedResults = 0;
            let maxResults = limit - 1;
            for(let i = 0; i < data.length; i++){
                let ranking = i + 1;
                let title = data[i].label;
                let visits = data[i].nb_visits || 0;

                //check if title is an article id
                var regex = RegExp('........-....-....-....-............');
                
                if(regex.test(title) === false){
                    let shortLabel = title;
                    shortLabel = shortLabel.length > 50 ? shortLabel.substr(0,50) + " [...]" : shortLabel;

                    tableResult.push({ 
                        Platz: ranking, 
                        Arbeitsraum: appService.format_string_capitalizeFirstLetter(shortLabel.replace(/-/g,' ')), 
                        Besuche: visits
                    });
                    addedResults++;
                }

                if(addedResults >= maxResults){break;}
            }

            return { 
                title: "Top-10-Arbeitsräume",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_top_rooms: " + err);
        }
    },

    get_top_devices: async (period, limit) => {
        console.log("get get_top_devices...");
        try {
            let tableResult = [];
            let currentRange = appService.get_date_ranges(period)[0];
            let data = await matomo.getData("&method=DevicesDetection.getType&period=range&date=" + currentRange + "&limit=" + limit);

            let resultDevices = [];
            resultDevices.push({ label: "Desktop", nb_visits: data.filter((p) => p.label === "Desktop")[0].nb_visits || 0 });
            resultDevices.push({ label: "Smartphone", nb_visits: data.filter((p) => p.label === "Smartphone")[0].nb_visits || 0 });
            resultDevices.push({ label: "Tablet", nb_visits: data.filter((p) => p.label === "Tablet")[0].nb_visits || 0 });

            resultDevices = resultDevices.sort((a, b) => (a.nb_visits < b.nb_visits) ? 1 : ((b.nb_visits < a.nb_visits) ? -1 : 0));

            let addedResults = 0;
            for(let i = 0; i < resultDevices.length; i++){
                let ranking = i + 1;
                let title = resultDevices[i].label;
                let visits = resultDevices[i].nb_visits || 0;
                tableResult.push({ 
                    Platz: ranking, 
                    Device: title, 
                    Besuche: visits
                });
                addedResults++;
                if(addedResults >= limit){break;}
            }

            return { 
                title: "Übersicht Gerätekategorie",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_top_devices: " + err);
        }
    },

    get_visits_by_day_of_week: async (period, limit) => {
        console.log("get get_visits_by_day_of_week...");
        try {
            let currentRange = appService.get_date_ranges(period)[0];

            let data = await matomo.getData("&method=VisitTime.getByDayOfWeek&period=month&date=" + currentRange.split(',')[0])
            
            let tableResult = [];
            for(let i = 0; i < data.length; i++){
                let title = data[i].label;
                let visits = data[i].nb_visits || 0;
                tableResult.push({ 
                    Tag: title, 
                    Besuche: visits
                });
            }

            return { 
                title: "Besuche nach Wochentage",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_visits_by_day_of_week: " + err);
        }
    },

    get_visits_by_local_time: async (period) => {
        console.log("get get_visits_by_local_time...");
        try {
            let currentRange = appService.get_date_ranges(period)[0];

            let data = await matomo.getData("&method=VisitTime.getVisitInformationPerLocalTime&period=month&date=" + currentRange.split(',')[0])
            
            let tableResult = [];
            for(let i = 0; i < data.length; i++){
                let title = data[i].label;
                let visits = data[i].nb_visits || 0;
                tableResult.push({ 
                    Stunde: title, 
                    Besuche: visits
                });
            }

            return { 
                title: "Besuche nach Zeit",
                data: tableResult
            };
        } catch (err) {
            logger.error("Error in function get_visits_by_local_time: " + err);
        }
    },
}