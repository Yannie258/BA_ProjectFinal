const fs = require ("fs");
const excel = require('excel4node');
const xlsx = require('node-xlsx');
var XLSXChart = require ("xlsx-chart");
const conf = require('../evmV1/config.json');
const logger = require('../modules/logger');

//https://github.com/natergj/excel4node


//https://blog.aspose.com/2020/08/05/create-excel-files-in-node.js/ ????

const workbookConfig = {
    jszip: {
      compression: 'DEFLATE',
    },
    defaultFont: {
      size: 12,
      name: 'Calibri',
      color: 'FFFFFFFF',
    },
    dateFormat: 'm/d/yy hh:mm:ss',
    workbookView: {
      activeTab: 0, // Specifies an unsignedInt that contains the index to the active sheet in this book view.
      autoFilterDateGrouping: true, // Specifies a boolean value that indicates whether to group dates when presenting the user with filtering options in the user interface.
      firstSheet: 1, // Specifies the index to the first sheet in this book view.
      minimized: false, // Specifies a boolean value that indicates whether the workbook window is minimized.
      showHorizontalScroll: true, // Specifies a boolean value that indicates whether to display the horizontal scroll bar in the user interface.
      showSheetTabs: true, // Specifies a boolean value that indicates whether to display the sheet tabs in the user interface.
      showVerticalScroll: true, // Specifies a boolean value that indicates whether to display the vertical scroll bar.
      tabRatio: 600, // Specifies ratio between the workbook tabs bar and the horizontal scroll bar.
      visibility: 'visible', // Specifies visible state of the workbook window. ('hidden', 'veryHidden', 'visible') (§18.18.89)
      windowHeight: 17620, // Specifies the height of the workbook window. The unit of measurement for this value is twips.
      windowWidth: 28800, // Specifies the width of the workbook window. The unit of measurement for this value is twips..
      xWindow: 0, // Specifies the X coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
      yWindow: 440, // Specifies the Y coordinate for the upper left corner of the workbook window. The unit of measurement for this value is twips.
    },
    logLevel: 0, // 0 - 5. 0 suppresses all logs, 1 shows errors only, 5 is for debugging
    author: 'T-Systems Multimedia Solutions GmbH', // Name for use in features such as comments
}

const worksheetConfig = {
    margins: {
        'left': 0
    },
    printOptions: {
        'centerHorizontal': true,
        'centerVertical': true,
        'printGridLines': false,
    },
}

let workbook = new excel.Workbook();
let worksheets = {};

let xlsxChart = new XLSXChart ();

// Create a reusable style
const styles = {
    h1: workbook.createStyle({
        font: {
            color: '#000000',
            size: 18
        }
    }),
    standard: workbook.createStyle({
        font: {
            color: '#000000',
            size: 12
        }
    }),
    tableHead: workbook.createStyle({
        font: {
            color: '#000000',
            size: 12,
            weight: 'bold'
        }
    }),
}

module.exports = {

    initNewWorkbook: () => {
        // Create a new instance of a Workbook class
        workbook = new excel.Workbook();
    },

    writeHeadline: (sheetName, value) =>{
        let worksheet;
        let cell = 1;
        let row = 1;
        if(typeof worksheets[sheetName] !== "undefined"){
            worksheet = worksheets[sheetName].worksheet;
            row = worksheets[sheetName].row++;
        }
        else{
            worksheet = workbook.addWorksheet(sheetName);
            worksheets[sheetName] = {};
            worksheets[sheetName].worksheet = worksheet;
        }

        worksheet.cell(row, cell).string(value).style(styles.h1);
        worksheets[sheetName].row = row + 2;
    },

    writeTable: (sheetName, tableData) => {
        let worksheet;
        let cell = 1;
        let row = 1;
        if(typeof worksheets[sheetName] !== "undefined"){
            worksheet = worksheets[sheetName].worksheet;
            row = worksheets[sheetName].row++;
        }
        else{
            worksheet = workbook.addWorksheet(sheetName);
            worksheets[sheetName] = {};
            worksheets[sheetName].worksheet = worksheet;
        }
        
        // 1. create table head
        for (var prob in tableData[0]) {
            worksheet.cell(row, cell).string(prob).style(styles.tableHead);
            cell++;
        }

        cell = 1;
        row++;

        // 2. add table content
        for (var j = 0; j < tableData.length; j++) {
            for (var prob in tableData[j]) {
                try {
                    if (tableData[j][prob] != undefined) {
                        //check if its is a number
                        if (tableData[j][prob] != "0" && (parseInt(tableData[j][prob]) == NaN || isNaN(tableData[j][prob]) || tableData[j][prob] == "")) {
                            worksheet.cell(row, cell).string(tableData[j][prob].toString()).style(styles.standard);
                        } 
                        else {
                            worksheet.cell(row, cell).number(parseInt(tableData[j][prob].toString())).style(styles.standard);
                        }
                    }
                    cell++;
                } catch (e) {
                    logger.error("XLSX value not defined: " + e);
                    logger.error("value: ", tableData[j][prob]);
                }
            }
            cell = 1;
            row++;
        }

        worksheets[sheetName].row = row + 2;
    },

    writeChart: () => {
        var xlsxChart = new XLSXChart();

    },

    writeResultsToExcelFile: () => {
        try {
            workbook.write(conf.config.archiveStorageLocation + conf.config.filename + '-' + (new Date()).getTime() + '.xlsx');
            workbook.write(conf.config.outputStorageLocation + conf.config.filename + '.xlsx');
            logger.info("----- DATA SUCCESSFULLY SAVED -----");
        } catch (e) {
            logger.error("XLSX is not writable: " + e);
        }
    },



    addLineChart: async (chartData, keyTitle, keyValue, title) => {

        let labels = [];
        let dataObject = {};
        dataObject[keyValue] = {};

        for(let i = 0; i < chartData.length; i++){
            let l = chartData[i][keyTitle];
            labels.push(l);
            dataObject[keyValue][l] = chartData[i][keyValue];
        }

        var opts = {
            chart: "column",
            titles: [
                keyValue
            ],
            fields: labels,
            data: dataObject,
            chartTitle: title
        };
        await xlsxChart.generate(opts, function (err, data) {
            fs.writeFileSync(title + ".xlsx", data);
        });
    },
}