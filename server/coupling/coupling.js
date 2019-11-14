const fs = require('fs');
_ = require('underscore');

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
                        importMap.set(key, filename);
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
                    importMap.set(lines[x].replace(",", ""), filename);
                });
                
            }
            lineNum++;
        })
        return importMap;
    }

    // readEachFile() {
    //     const content = fs.readFileSync("test/project1/files/appServiceProvider.ts", "UTF-8");
    //     const lines = content.split("\n");
    //     lines.forEach(line => {
            
    //         if (line.trim().split(" ")[0] !== "import") {
    //             console.log(line.trim());
    //         }
    //     })
    // }
}

let x = new Coupling("");
let y = x.extractImports();
console.log("");


module.exports = Coupling;