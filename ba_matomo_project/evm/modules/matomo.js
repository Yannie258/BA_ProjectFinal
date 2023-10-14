const conf = require('../evmV1/config.json');
const logger = require('../modules/logger');
const fetch = require('node-fetch-with-proxy');
const ENV = conf.config.active_env;

const domainSiteIDs = {
    "Test" : "1",
    "Prod": "2",
    "Cloud": "3",
}

let requests = [];

module.exports = {

    getData: async (parameter) => {
        
        let apiRequestTimeout = parseInt(conf.config.apiRequestTimeout); // in ms
        await setTimeout(function() { }, apiRequestTimeout);
        
        let idSite = "9"; //domainSiteIDs["Prod"];
        let token = conf.settings[ENV].token;
        let url = conf.settings[ENV].url + "&idSite=" + idSite + "&format=json&token_auth=" + token + parameter;
        
        //fetch data from url
        const response = await fetch(url);

        //error handling
        if(response.headers.get('content-type').indexOf("text/html") > -1){
            logger.error("API error code...")
            return {};
        }
        else{
            let res = await response.json();
            if(res.result === "error"){ logger.error("Error in matomo connector request: ", res, url); return {}; }
            return res;
        }
    },
}