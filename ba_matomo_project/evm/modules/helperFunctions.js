const logger = require('../modules/logger');

module.exports = {

    getLastDaysAsDatesArray: (days) => {
        var dates = [];
        var endDate = new Date();
        var startDate = new Date();
        startDate.setDate(endDate.getDate() - days);
        //startdate to fix date: 01.03. 
        startDate.setDate(1); //1
        startDate.setMonth(2); //2
        startDate.setYear(2021); //2020
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
    
        //  endDate.setDate(26); //1
        //  endDate.setMonth(0); //2
        //  endDate.setYear(2021);
        //  endDate.setHours(0);
        //  endDate.setMinutes(0);
        //  endDate.setSeconds(0);
    
        endDate.setDate(endDate.getDate() - 1);
        var datePointer = startDate;
        // use 'datePointer.getTime() <= endDate.getTime()' to get todays values as well
        while (datePointer.getTime() <= endDate.getTime()) {
            dates.push(datePointer.toISOString().split('T')[0]);
            datePointer.setDate(datePointer.getDate() + 1);
        }
        return dates;
    },
    
    getWeekNumber: (d) => {
        // Copy date so don't modify original
        d = new Date(d);
        // Set to nearest Thursday: current date + 4 - current day number
        // Make Sunday's day number 7
        d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
        // Get first day of year
        var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
        // Calculate full weeks to nearest Thursday
        var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
        // Return array of year and week number
        return { year: d.getUTCFullYear(), weeknumber: weekNo };
    },
    
    getLastDaysBetweenDatesAsDatesArray: (start) => {
        var dates = [];
        var endDate = new Date();
        var startDate = new Date();
        var dateParts = start.split('-');
        startDate.setDate(new Date(start).getDate() + 2);
        startDate.setMonth(dateParts[1] - 1); 
        startDate.setYear(dateParts[0]);
        startDate.setHours(0);
        startDate.setMinutes(0);
        startDate.setSeconds(0);
    
        endDate.setDate(endDate.getDate());
        var datePointer = startDate;
    
        // use 'datePointer.getTime() <= endDate.getTime()' to get todays values as well
        while (datePointer.getTime() <= endDate.getTime()) {
            dates.push(datePointer.toISOString().split('T')[0]);
            datePointer.setDate(datePointer.getDate() + 1);
        }
        //console.log(dates);
        return dates;
    },

    getDaysBetweenDatesAsDatesArray: (start, end) => {
        var dates = [];
        
        //start
        var startDate = new Date(start);

        //end
        var endDate = new Date(end);
        // endDate.setDate(new Date(end).getDate() + 1)

        //generate array
        var datePointer = startDate;
        while (datePointer.getTime() <= endDate.getTime()) {
            dates.push(datePointer.toISOString().split('T')[0]);
            datePointer.setDate(datePointer.getDate() + 1);
        }

        //console.log(dates);
        return dates;
    },
    
    isValidJsonFormat: (jsonStr) => {
        if (typeof jsonStr != "String") {
            jsonStr = JSON.stringify(jsonStr);
        }
    
        if (isNaN(jsonStr) && jsonStr !== undefined && jsonStr !== "" && jsonStr !== null && jsonStr !== "null"
            && /^[\],:{}\s]*$/.test(jsonStr.replace(/\\["\\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        } else {
            return false;
        }
    },
    
    beautifyText: (input) => {
        const toTitleCase = (phrase) => {
            return phrase
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        };
    
        var out = "";
        out = input.replace(/-/g, ' ');
        out = toTitleCase(out);
        // out = out.replace(/Und/g, 'und');
        // out = out.replace(/Db/g, 'DB');
        // out = out.replace(/[^a-zA-Z ]/g, "");
        out = out.toUpperCase();
    
        return out;
    },
    
    similarity: (s1, s2) => {
        var longer = s1;
        var shorter = s2;
        if (s1.length < s2.length) {
            longer = s2;
            shorter = s1;
        }
        var longerLength = longer.length;
        if (longerLength == 0) {
            return 1.0;
        }
        return (longerLength - editDistance(longer, shorter)) / parseFloat(longerLength);
    },

    editDistance: (s1, s2) => {
        s1 = s1.toLowerCase();
        s2 = s2.toLowerCase();
    
        var costs = new Array();
        for (var i = 0; i <= s1.length; i++) {
            var lastValue = i;
            for (var j = 0; j <= s2.length; j++) {
                if (i == 0)
                    costs[j] = j;
                else {
                    if (j > 0) {
                        var newValue = costs[j - 1];
                        if (s1.charAt(i - 1) != s2.charAt(j - 1))
                            newValue = Math.min(Math.min(newValue, lastValue),
                                costs[j]) + 1;
                        costs[j - 1] = lastValue;
                        lastValue = newValue;
                    }
                }
            }
            if (i > 0)
                costs[s2.length] = lastValue;
        }
        return costs[s2.length];
    },

    format_value: (format, value) => {
        let out = "";
        if(format === "integer"){
            out = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");         
        }
        if(format === "date_de"){
            let parts = value.toString().split('-');
            out = parts[2] + "." + parts[1] + "." + parts[0];
        }
        if(format === "text"){
            out = value.toString();
        }
        return out;
    },

    array_to_list: (format, arr, key) => {
        let out = "";
        for(let i = 0; i < arr.length; i++){
            out += module.exports.format_value(format, arr[i][key]) + "\n\n";
        }
        
        return out;
    },

    object_to_array: (arrayWithObjects, key) => {
        let out = [];
        // console.log("--- object_to_array ", JSON.stringify(arrayWithObjects))
        for(let i = 0; i < arrayWithObjects.length; i++){
            out.push(arrayWithObjects[i][key]);
        }
        return out;
    },
}