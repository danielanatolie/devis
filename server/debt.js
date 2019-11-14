const fs = require('fs');

processDirectory = async () => {
    return await computeComplexityScore(extractFileContents());
}

extractFileContents = async () => {
    return fs.readdir(path, function(err, items) {
        return fileContents = items.map((fileName) => {
            return await fs.readFileSync(__dir + "/" + fileName, 'utf8');
        })
    });
}

computeComplexityScore = (fileContents) => {
    let fileToDebt;
    /*  TODO
        1. split on file lines
        2. if line = funcDec, begin parameter analysis, spawn line, and tab spacing counter
        3. compute & return Map
    */
    return fileToDebt;
}
