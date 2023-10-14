const cron = require('node-cron');
const conf = require('./config');
const ENV = conf.config.active_env;

const logger = require('../modules/logger');
const excel = require('../modules/excel');
const officeBridge = require('../modules/officebridge/index');
const helpers = require('../modules/helperFunctions');

const appController = require('./app.controller');
const appService = require('./app.service');

const maxTries = 5;
let currentTries = 0;
let running = false;

const monthNames = ["Januar","Februar","März","April","Mai","Juni","Juli","August","September","Oktober","November","Dezember"];


logger.info('Started Matomo data loading app.');
logger.info('Scheduling for data loading task: ' + conf.settings[ENV].cronSchedule);

// run cron job at specified scheduling
cron.schedule(conf.settings[ENV].cronSchedule, run);
async function run() {
    try {
        logger.info('MatomoDataLoading: started task iteration.');
        if (running) {
            logger.info('MatomoDataLoading: task is already running - skipping this iteration.');
            return;
        }

        running = true;
        await start();
        running = false;
        currentTries = 0;

        logger.info('MatomoDataLoading: successfully finished task iteration.');
    } catch (e) {
        running = false;
        currentTries = currentTries + 1;
        logger.error(e);
        if (currentTries > maxTries) {
            currentTries = 0;
            logger.warn('MatomoDataLoading: reached todays max retry limit. Abort task iteration after ' + maxTries + ' retries.');
            // TODO: send mail to defined mail adresses
        } else {
            logger.info('MatomoDataLoading: Error while running task. Will retry for the ' + currentTries + '. time in 1 minute.');
            setTimeout(run, 300000);
        }
    }
}

async function start() {
    logger.info("----- START OF DATA LOADING -----");

    //#### 1. get data
    let tableKpis = await appController.get_overview_kpis("lastMonth");
    let tableHomepages = await appController.get_homepages("lastMonth", 10);
    let tablePageviews = await appController.get_pageviews("lastMonth", 10);
    let tableSearchs = await appController.get_searchs("lastMonth", 10);
    let tableArticlesTop10 = await appController.get_top_articles("lastMonth", 10);
    let tableRoomsTop10 = await appController.get_top_rooms("lastMonth", 10);
    let tableDevicesTop3 = await appController.get_top_devices("lastMonth", 3);
    let tableVisitsByDayOfWeek = await appController.get_visits_by_day_of_week("lastMonth", 7);
    let tableVisitsByTime = await appController.get_visits_by_local_time("lastMonth", 24);


    //#### 2.create word
    let data = {
        "report_month": monthNames[new Date(appService.get_date_ranges("lastMonth")[0].split(',')[0]).getMonth()],
        "report_year": new Date(appService.get_date_ranges("lastMonth")[0].split(',')[0]).getFullYear(),
        "report_startDate": helpers.format_value("date_de", appService.get_date_ranges("lastMonth")[0].split(',')[0]),
        "report_endDate": helpers.format_value("date_de", appService.get_date_ranges("lastMonth")[0].split(',')[1]),
        
        "kpis_visits_value": helpers.format_value("integer", tableKpis.data.filter((p) => p.KPI === "Besuche insgesamt")[0].Wert),
        "kpis_visits_progress": tableKpis.data.filter((p) => p.KPI === "Besuche insgesamt")[0].Entwicklung,
        "kpis_visits_progress_value": tableKpis.data.filter((p) => p.KPI === "Besuche insgesamt")[0].EntwicklungWert,
        "kpis_duration_value": helpers.format_value("integer", tableKpis.data.filter((p) => p.KPI === "Durchschnittliche Verweildauer")[0].Wert),
        "kpis_duration_progress": tableKpis.data.filter((p) => p.KPI === "Durchschnittliche Verweildauer")[0].Entwicklung,
        "kpis_duration_progress_value": tableKpis.data.filter((p) => p.KPI === "Durchschnittliche Verweildauer")[0].EntwicklungWert,
        "kpis_likes_value": helpers.format_value("integer", tableKpis.data.filter((p) => p.KPI === "Gefällt-mir-Angaben")[0].Wert),
        "kpis_likes_progress": tableKpis.data.filter((p) => p.KPI === "Gefällt-mir-Angaben")[0].Entwicklung, 
        "kpis_likes_progress_value": tableKpis.data.filter((p) => p.KPI === "Gefällt-mir-Angaben")[0].EntwicklungWert, 
        "kpis_comments_value": helpers.format_value("integer", tableKpis.data.filter((p) => p.KPI === "Kommentare")[0].Wert),
        "kpis_comments_progress": tableKpis.data.filter((p) => p.KPI === "Kommentare")[0].Entwicklung,
        "kpis_comments_progress_value": tableKpis.data.filter((p) => p.KPI === "Kommentare")[0].EntwicklungWert,
        "kpis_hits_total_value": helpers.format_value("integer", tableKpis.data.filter((p) => p.KPI === "Seitenansichten insgesamt")[0].Wert),
        "kpis_hits_total_progress": tableKpis.data.filter((p) => p.KPI === "Seitenansichten insgesamt")[0].Entwicklung,
        "kpis_hits_total_progress_value": tableKpis.data.filter((p) => p.KPI === "Seitenansichten insgesamt")[0].EntwicklungWert,

        "homepages_value_list": helpers.array_to_list("integer", tableHomepages.data, "Aufrufe"),
        "homepages_title_list": helpers.array_to_list("text", tableHomepages.data, "Seitentitel"),
        "homepages_progress_list": helpers.array_to_list("text", tableHomepages.data, "Entwicklung"),
        "homepages_progress_value_list": helpers.array_to_list("integer", tableHomepages.data, "EntwicklungWert"),
        
        "pageviews_value_list": helpers.array_to_list("integer", tablePageviews.data, "Aufrufe"),
        "pageviews_title_list": helpers.array_to_list("text", tablePageviews.data, "Seitentitel"),
        "pageviews_progress_list": helpers.array_to_list("text", tablePageviews.data, "Entwicklung"),
        "pageviews_progress_value_list": helpers.array_to_list("integer", tablePageviews.data, "EntwicklungWert"),
        
        "search_ranking_list": helpers.array_to_list("integer", tableSearchs.data, "Platz"),
        "search_keyword_list": helpers.array_to_list("text", tableSearchs.data, "Suchwort"),
        "search_requests_list": helpers.array_to_list("integer", tableSearchs.data, "Suchanfragen"),
        
        "article_ranking_list": helpers.array_to_list("integer", tableArticlesTop10.data, "Platz"),
        "article_title_list": helpers.array_to_list("text", tableArticlesTop10.data, "Beitrag"),
        "article_visits_list": helpers.array_to_list("integer", tableArticlesTop10.data, "Besuche"),

        "room_ranking_list": helpers.array_to_list("integer", tableRoomsTop10.data, "Platz"),
        "room_title_list": helpers.array_to_list("integer", tableRoomsTop10.data, "Arbeitsraum"),
        "room_visits_list": helpers.array_to_list("integer", tableRoomsTop10.data, "Besuche"),

        "device_ranking_list": helpers.array_to_list("integer", tableDevicesTop3.data, "Platz"),
        "device_title_list": helpers.array_to_list("text", tableDevicesTop3.data, "Device"),
        "device_visits_list": helpers.array_to_list("integer", tableDevicesTop3.data, "Besuche"),

        "chart_weekdays_visits_ranking": await officeBridge.createAndSafeChart({
            filename: "chart_weekdays_visits_ranking", 
            title: "Besuche nach Wochentagen",
            type: "bar",
            data: {
                labels: helpers.object_to_array(tableVisitsByDayOfWeek.data, "Tag"),
                xlabel: "Tage",
                ylabel: "Besuche",
                datasets: [
                    {
                        label: "Besuche",
                        data: helpers.object_to_array(tableVisitsByDayOfWeek.data, "Besuche")
                    }
                ]
            }, 
        }),

        "chart_local_time_visits_ranking": await officeBridge.createAndSafeChart({
            filename: "chart_local_time_visits_ranking", 
            title: "Besuche nach lokaler Zeit",
            type: "bar",
            data: {
                labels: helpers.object_to_array(tableVisitsByTime.data, "Stunde"),
                xlabel: "Stunden",
                ylabel: "Besuche",
                datasets: [
                    {
                        label: "Besuche",
                        data: helpers.object_to_array(tableVisitsByTime.data, "Besuche")
                    }
                ]
            }, 
        }),


    }

    await officeBridge.createWordFileFromTemplateData(data)
}
