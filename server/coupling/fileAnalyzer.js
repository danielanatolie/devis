const fs = require('fs');
const _ = require('underscore');

class FileAnalyzer {
    constructor(projectName, filename) {
        this.filename = filename;
        this.lines = fs.readFileSync("test/" + projectName + "/files/" + filename, "UTF-8").split("\n");
        this.lastImportLine = this.getLastImportLine();
    }

    getLastImportLine() {
        let counter = 0;
        let lastImport = 0;
        this.lines.forEach(line => {
            counter++;
            if (line.split(" ")[0] == "import") {
                lastImport = counter;
            }
        });
        return lastImport;
    }

    extractImports() {
        let importMap = new Map();
        if (this.filename === "constants.ts") {
            return importMap;
        }
        let lineNum = 1;
        while (lineNum <= this.lastImportLine) {
            let curLine = this.lines[lineNum - 1];
            if (curLine.split(" ")[0] === "import") {
                if (curLine.split(" ").pop().startsWith("\".")) {
                    const filename = curLine.split(" ").pop().split("/").pop().replace("\";", "");
                    const values = curLine.split("{").pop().split("}")[0].split(",");
                    values.forEach(key => {
                        importMap.set(key.trim(), filename);
                    })
                }
            }
            else if (curLine.split(" ").pop().startsWith("\".")) {
                let checker = lineNum - 1;
                while (this.lines[checker - 1].split(" ")[0] !== "import") {
                    checker--;
                };
                const filename = this.lines[lineNum - 1].split(" ").pop().split("/").pop().replace("\";", "");
                _.range(checker, lineNum - 1).forEach(x => {
                    importMap.set(this.lines[x].replace(",", "").trim(), filename);
                });

            }
            lineNum++;
        }
        return importMap;
    }

    countDependencies() {
        const importMap = this.extractImports();
        const keys = [...importMap.keys()];
        let result = {};
        _.range(this.lastImportLine, this.lines.length).forEach(x => {
            keys.forEach(key => {
                if (this.lines[x].indexOf(key) > 0) {
                    result[this.filename + "&&" + importMap.get(key) + ".ts"] = result[this.filename + "&&" + importMap.get(key) + ".ts"] + 1 || 1;
                }
            });
        });
        return result;
    }
}

let c = new FileAnalyzer("project1", "generate-test.ts");
let x = c.countDependencies();
console.log("here");

module.exports = FileAnalyzer; 
