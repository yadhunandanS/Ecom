var winston = require('winston');
// require('winston-mongodb');
const { DB_URL } = process.env;

console.log('DB_URL:', DB_URL); // Check if the DB_URL is correctly set

const logger = new winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "logfile.log" })
    ]
})


// winston.error("Some message");

module.exports = { logger };