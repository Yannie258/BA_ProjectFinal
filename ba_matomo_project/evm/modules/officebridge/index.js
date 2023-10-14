const logger = require('../../modules/logger');
const spawn = require("child_process").spawn;

const pythonInstance = "python3";
const pluginPath = "../modules/officebridge/plugins/";

module.exports = {
    createWordFileFromTemplateData: (data) => {
        const plugin = "createWordFileFromTemplateData.py";
        return new Promise(resolve => {
            const pythonProcess = spawn(pythonInstance, [pluginPath + plugin, JSON.stringify(data)]);
            pythonProcess.stdout.on('data', (p) => {
                // console.log("createWordFileFromTemplateData --> ", p + "")
                resolve({ script: plugin, message: "" + p });
            });
            pythonProcess.stderr.on('data', (p) => {
                logger.error("Error in Module Office Bridge - Word: " + p);
                resolve({ script: plugin, message: "error... " + p});
            });
        });
    },
    createAndSafeChart: (data) => {
        // console.log(JSON.stringify(data));
        const plugin = "createAndSafeChart.py";
        return new Promise(resolve => {
            const pythonProcess = spawn(pythonInstance, [pluginPath + plugin, JSON.stringify(data)]);
            pythonProcess.stdout.on('data', (p) => {
                resolve(p.toString().replace('\n', '').replace('\r', ''));
            });
            pythonProcess.stderr.on('data', (p) => {
                logger.error("Error in Module Office Bridge - Chart: " + p);
                resolve("");
            });
        });
    },
}