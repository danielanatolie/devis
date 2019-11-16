const fs = require('fs');
const testFolderPath = './test/project1/files';
const _ = require('underscore');

let fileToDebtMap = new Map();

buildFileToDebtMap = async () => {
    return fs.readdir(testFolderPath, function(err, items) {
        items.map((fileName) => {
            getFileDebt(fileName);
        });
    });
}

getFileDebt = async (fileName) => {
    fs.readFile(testFolderPath+"/"+fileName, {encoding: 'utf-8'}, function(err,data){
        analyzeFile(fileName, data.split("\n"));
    });
}

analyzeFile = (fileName, fileDataArr) => {
    let fnCount = 0;
    let fnToDataMap = new Map();
    console.log("analyzing file: ", fileName);
    let lineNum = 0;
    while (lineNum < fileDataArr.length) {
        if (isFunctionDec(fileDataArr[lineNum++])) {
            let braceBalance = 1;
            let fnData = [];
            while (braceBalance != 0) {
                if (_.isUndefined(fileDataArr[lineNum])) break;
                braceBalance += computeBraceBalance(fileDataArr[lineNum]);
                fnData.push(fileDataArr[lineNum++]);
            }
            fnToDataMap.set(fnCount, fnData);
            fnCount++;
        }
    }
    computeFileComplexity(fileName, fnToDataMap);
}

isFunctionDec = (fileLine) => {
    return fileLine.includes("):") && fileLine.includes("{");
}

computeBraceBalance = (fileLine) => {
    if (fileLine.includes("{") && fileLine.includes("}")) return 0;
    else if (fileLine.includes("{")) return 1;
    else if (fileLine.includes("}")) return -1;
    else return 0;
}

computeFileComplexity = (fileName, fnToDataMap) => {
    let totalFileDebt = 0;
    for (let i = 0; i < fnToDataMap.size; i++) {
        totalFileDebt += computeFnDebt(fnToDataMap.get(i));
    }
    console.log(fileName, " has debt = ", totalFileDebt);
    fileToDebtMap.set(fileName, totalFileDebt);
}

computeFnDebt = (fnData) => {
    let fnDebt = 0;
    if (isLongFunction(fnData)) fnDebt++;
    if (hasLongLines(fnData)) fnDebt++;
    if (hasManyIfs(fnData)) fnDebt++;
    return fnDebt;
}

isLongFunction = (fnData) => { return fnData.length > 10; }

hasLongLines = (fnData) => {
    let totalLineLen = 0;
    for (let i = 0; i < fnData.length; i++) {
        totalLineLen += fnData[i].length;
    }
    return totalLineLen/fnData.length > 40;
}

hasManyIfs = (fnData) => {
    let ifCount = 0;
    for (let i = 0; i < fnData.length; i++) 
        if (fnData[i].includes("if")) ifCount++;
    return ifCount >= 3;
}

buildFileToDebtMap();