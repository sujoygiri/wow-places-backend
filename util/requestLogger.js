// incomming request logger
const fs = require("node:fs");

const requestLogger = (req, res, next) => {
    const { method, url } = req;
    const start = Date.now();
    const date = new Date().toISOString().slice(0, 10);
    const time = new Date().toISOString().slice(11, 19);
    const fileName = `./logs/${date}.log`;
    res.on("finish", () => {
        const { statusCode } = res;
        const responseTime = Date.now() - start;
        const log = `Date:-${date} - Time:-${time} - Method:-${method} - Url:-${url} - Statuscode:-${statusCode} - Responsetime:-${responseTime}ms\n`;
        fs.appendFile(fileName, log, (err) => {
            if (err) {
                console.log(err);
            }
        });
    });
    next();
}

module.exports = requestLogger;

