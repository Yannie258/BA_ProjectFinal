const log4js = require('log4js');


log4js.configure({
    appenders: {
        file: {
            type: 'file',
            filename: '../logs/app.log',
            maxLogSize: 100 * 1024 * 1024
        },
        console: {
            type: 'console'
        }
    },
    categories: {
        default: { appenders: ['file', 'console'], level: 'debug' }
    }
});

const logger = log4js.getLogger();

module.exports = {
    info: (msg)=>{
        logger.info(msg);
    },
    error: (msg)=>{
        logger.error(msg);
    },
    warn: (msg)=>{
        logger.warn(msg);
    },
}