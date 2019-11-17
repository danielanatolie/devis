const fs = require('fs');
const testFolderPath = './test/project1/files';
const _ = require('underscore');
const util = require('util');
const readdir = util.promisify(fs.readdir);

let fileToDebtMap = new Map();

buildFileToDebtMap = async () => {
    let fileNames;
    try {
        fileNames = await readdir(testFolderPath);
    } catch (err) {
        console.log(err);
    }
    await getAllFiles(fileNames).then((fileDataArr) => {
        fileDataArr.forEach((fileData, i) => {
            analyzeFile(fileNames[i], fileData.split("\n"));
        })
    })
    return fileToDebtMap;
}

getAllFiles = (fileNames) => {
    let promises = fileNames.map((fileName) => getFile(fileName));
    return Promise.all(promises);
}

getFile = (fileName) => {
    return fs.readFileAsync(testFolderPath+"/"+fileName);
} 

fs.readFileAsync = function(filename) {
    return new Promise(function(resolve, reject) {
        fs.readFile(filename, {encoding: 'utf-8'}, function(err, data){
            if (err) 
                reject(err); 
            else 
                resolve(data);
        });
    });
};

analyzeFile = (fileName, fileDataArr) => {
    let fnCount = 0;
    let fnToDataMap = new Map();
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

module.exports = {
    buildFileToDebtMap: buildFileToDebtMap
}
