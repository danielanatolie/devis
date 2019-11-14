const fs = require('fs');
const _ = require('underscore');

class Coupling {
    constructor(projectName) {
        this.tsFiles = [];
        this.projectName = projectName;
    }

    getTSFiles() {
        fs.readdir("test/project1/files", (err, files) => {
            files.forEach(filename => {
                if (filename.split(".").pop() == "ts") {
                    this.tsFiles.push(filename);
                }
            });
        }); 
    }

    // can be pulled into another class (methods that read each file)
    // constructor: path to each file
    // pull some pop/splits out as methods
    extractImports() {
        let importMap = new Map();
    const content = fs.readFileSync("test/project1/files/appServiceProvider.ts", "UTF-8");
        const lines = content.split("\n");
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
        const content = fs.readFileSync("test/project1/files/appServiceProvider.ts", "UTF-8");
        let counter = 0;
        let lastImport = 0;
        content.split("\n").forEach(line => {
            counter++;
            if (line.split(" ")[0] == "import") {
                lastImport = counter;
            }
        });
        return lastImport;
    }

    dependencyCounter() {
        // push to result map
        let content = fs.readFileSync("test/project1/files/appServiceProvider.ts", "UTF-8");
        const importMap = this.extractImports();
        const keys = [...importMap.keys()];
        let result = {};
        // might have to initialize all values as null first
        content = content.split("\n");
        _.range(this.getLastImportLine(), content.length).forEach(x => {
            keys.forEach(key => {
                if (content[x].indexOf(key) > 0) {
                    console.log("key: " + key + " class: " + importMap.get(key) + " linenum: " + (x+1))
                    result["coupling.ts&&" + importMap.get(key) + ".ts"] = result["coupling.ts&&" + importMap.get(key) + ".ts"] + 1 || 1;
                }
            });
            
        });
        return result;
    }
}

let x = new Coupling("");
let y = x.dependencyCounter();
console.log("");


module.exports = Coupling;