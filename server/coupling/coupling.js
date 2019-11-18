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
        let return_values = [];
        let result = {};
        let filenames = [];
        this.getTSFiles()
        this.tsFiles.forEach((filename) => {
            filenames.push(filename)
            const fileAnalyzer = new FileAnalyzer(this.projectName, filename);
            const fileDependencies = fileAnalyzer.countDependencies();
            for (let dependency in fileDependencies) {
                result[dependency] = fileDependencies[dependency];
            }
        })
        return_values.push(result);
        return_values.push(filenames);
        return return_values;

    }
}

module.exports = Coupling;