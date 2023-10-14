const logger = require('../modules/logger');
const helpers= require('../modules/helperFunctions');

module.exports = {
    calc_avg: (table, col) => {
        try{
            let sum = 0;
            for(let i = 0; i < table.length; i++) {
                // sum
            }
        }catch(e){ logger.error(e); }

        return table;
    },

    calc_performance: (before, after) => {
        let result = "-";
        try{
            if(typeof before === "number" && typeof after === "number"){
                let performance = ((after-before)/before * 100);
                return (performance <= 0 ? "" : "+") + (Math.round(performance * 100) / 100).toString() + " %";
            }
        }catch(e){ logger.error(e); }
        return result;
    },

    calc_performance_absolute: (before, after) => {
        let result = "-";
        try{
            if(typeof before === "number" && typeof after === "number"){
                let performance = after - before;
                return (performance <= 0 ? "" : "+") + helpers.format_value("integer", performance).toString();
            }
        }catch(e){ logger.error(e); }
        return result;
    },

    get_date_ranges: (period) => {

        let getlastWeekRange = (pastInterval) =>{ //(range in day, 0=current week 1=last week ....)
            var pastDate = new Date().getDate() - 7 * pastInterval;
            var curr = new Date(new Date().setDate(pastDate));

            var first = curr.getDate() - curr.getDay() + 1;
            var last = first + days-1;
            var firstday = new Date(curr.setDate(first)).toISOString().split('T')[0];
            var lastday = new Date(curr.setDate(last)).toISOString().split('T')[0];
        
            return firstday + "," + lastday;
        }

        let getlastMonthRange = (pastInterval) =>{
            var pastDate = new Date().getDate() - 30 * pastInterval;
            var curr = new Date(new Date().setDate(pastDate));
            var y = curr.getFullYear(); 
            var m = curr.getMonth();
        
            var first = new Date(y, m, 2);
            var last = new Date(y, m + 1, 1);
            var firstday = first.toISOString().split('T')[0];
            var lastday = last.toISOString().split('T')[0];
        
            return firstday + "," + lastday;
        }
        
        try{
            switch(period){
                case 'lastWeek': return [getlastWeekRange(1), getlastWeekRange(2)];
                case 'lastMonth': return [getlastMonthRange(1), getlastMonthRange(2)];
            }
        }catch(e){ logger.error(e); }
        return [];
    },

    format_string_capitalizeFirstLetter: (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },

    seconds_to_timestring: (sec) => {
        sec = sec.toString().replace('-','');
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);

        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        
        return hours+':'+minutes+':'+seconds;
    },
}