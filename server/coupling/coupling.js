const fs = require('fs');
const FileAnalyzer = require('./fileAnalyzer');

class Coupling {
    constructor(projectName) {
        this.projectName = projectName;
        this.tsFiles = [];
    }

    getTSFiles() {
        fs.readdirSync("test/project1/files").forEach(filename => {
            if (filename.split(".").pop() == "ts") {
                this.tsFiles.push(filename);
            }
        });
    }

    countAllDependencies() {
        let result = {};
        this.getTSFiles()
        this.tsFiles.forEach((filename) => {
            const fileAnalyzer = new FileAnalyzer(this.projectName, filename);
            const fileDependencies = fileAnalyzer.countDependencies();
            for (let dependency in fileDependencies) {
                result[dependency] = fileDependencies[dependency];
            }
        })
        return result;

    }

    static cleanDependencyMap(result) {

    }

}


let c = new Coupling("project1");
let x = c.countAllDependencies();
console.log("hello");

module.exports = Coupling;