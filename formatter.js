module.exports = function(results, data) {
    var results = results || [];

    var summary = results.reduce(
        function(seq, current) {
            current.messages.forEach(function(msg) {
                var logMessage = {
                    filePath: current.filePath,
                    ruleId: msg.ruleId,
                    ruleUrl: data.rulesMeta[msg.ruleId].url,
                    message: msg.message,
                    line: msg.line,
                    column: msg.column
                };

                if (msg.severity === 1) {
                    logMessage.type = "warning";
                    seq.warnings.push(logMessage);
                }
                if (msg.severity === 2) {
                    logMessage.type = "error";
                    seq.errors.push(logMessage);
                }
            });
            return seq;
        },
        {
            errors: [],
            warnings: []
        }
    );

    if (summary.errors.length > 0 || summary.warnings.length > 0) {
        var jsonString = summary.errors
            .concat(summary.warnings)
            .map(function(msg) {
                if (msg.ruleId == "complexity") {
                    return (
                        "\"" + msg.filePath + ":" +
                        msg.line +
                        ":" +
                        msg.column + "\"" + ": " + 
                        (msg.ruleUrl ? " (" + msg.ruleUrl + ")" : "" + "\"" +
                        msg.message + "\"" + "," 
                    ));
                }
            })
            .join("\n");

        var truncatedjson = jsonString.replace(/(^\s*,)|(,\s*$)/g, '').trim();

        return "{" + "\n" + truncatedjson + "\n" + "}";
    }
};