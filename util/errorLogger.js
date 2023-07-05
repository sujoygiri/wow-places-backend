const fs = require('fs');
let errorLogger = (err, req, res, next) => {
    if (err) {
        fs.appendFile('./logs/error.log', `${new Date().toDateString()} - ${err.stack}\n`, (error) => {
            if (error) {
                console.log("logging failed");
            }
        });
        if (err.status) {
            res.status(err.status);
        }
        else {
            res.status(500);
        }
        res.json({
            status: 'error',
            success: false,
            message: err.message
        });
    }
    next();
};
module.exports = errorLogger;
