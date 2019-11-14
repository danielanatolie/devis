const fs = require('fs');
const _ = require('underscore');

class FileAnalyzer {
    constructor(projectName, filename) {
        this.path = "test/" + projectName + "/files/" + filename;
        this.content = fs.readFileSync(this.path, "UTF-8");
    }

    extractImports() {
        let importMap = new Map();
        const lines = this.content.split("\n");
        let lineNum = 1;
        lines.forEach(line => {
            if (line.split(" ")[0] === "import") {
                if (line.split(" ").pop().startsWith("\".")) {
                    const filename = line.split(" ").pop().split("/").pop().replace("\";", "");
                    const values = line.split("{").pop().split("}")[0].split(",");
                    values.forEach(key => {
                        importMap.set(key.trim(), filename);
                    })
                }
            }
            else if (line.split(" ").pop().startsWith("\".")) {
                let checker = lineNum - 1;
                while (lines[checker - 1].split(" ")[0] !== "import") {
                    checker--;
                };
                const filename = lines[lineNum - 1].split(" ").pop().split("/").pop().replace("\";", "");
                _.range(checker, lineNum - 1).forEach(x => {
                    importMap.set(lines[x].replace(",", "").trim(), filename);
                });
                
            }
            lineNum++;
        })
        return importMap;
    }

    getLastImportLine() {
        let counter = 0;
        let lastImport = 0;
        this.content.split("\n").forEach(line => {
            counter++;
            if (line.split(" ")[0] == "import") {
                lastImport = counter;
            }
        });
        return lastImport;
    }

    dependencyCounter() {
        const importMap = this.extractImports();
        const keys = [...importMap.keys()];
        let result = {};
        let content = this.content.split("\n");
        _.range(this.getLastImportLine(), content.length).forEach(x => {
            keys.forEach(key => {
                if (content[x].indexOf(key) > 0) {
                    result["coupling.ts&&" + importMap.get(key) + ".ts"] = result["coupling.ts&&" + importMap.get(key) + ".ts"] + 1 || 1;
                }
            });
        });
        return result;
    }
}

let c = new FileAnalyzer("project1", "appServiceProvider.ts");
let x = c.dependencyCounter();
console.log("here");

module.exports = FileAnalyzer; 