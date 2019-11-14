const fs = require('fs');

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
        const content = fs.readFileSync("test/project1/files/appServiceProvider.ts", "UTF-8");
        const lines = content.split("\n");
        let imports = [];
        lines.forEach(line => {
            if (line.split(" ")[0] == "import") {
                if (line.split(" ").pop().startsWith("\".")) {
                    imports.push(line.split(" ").pop().split("/").pop().replace("\";", ""));
                }
            }
        })
        imports.forEach(im => {
            console.log(im);
        })
    }
}

let x = new Coupling("");
x.extractImports();



module.exports = Coupling;