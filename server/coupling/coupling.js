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
}

let x = new Coupling("");
let y = x.dependencyCounter();
console.log("");


module.exports = Coupling;