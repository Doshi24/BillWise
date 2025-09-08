// import winston from "winston";
import pkg from "winston";
const { createLogger, format, transports } = pkg;
import path from "path";
import fs from "fs";    



//check logs dir
const logsdir  = 'Logs'
if(!fs.existsSync(logsdir)){
    fs.mkdirSync(logsdir);
}

//format
const logformat  = format.combine(
    format.timestamp({format : 'DD-MM-YYYY HH:mm:ss'}),
    format.printf(
        (info) => `[${info.timestamp}] ${info.level.toUpperCase()}: ${info.message}`
    )
);


//create logger
const logger = createLogger({
    level : "info",
    format : logformat,
    transports :[
        new transports.File({
            filename : path.join(logsdir, 'error.log'),
            level : 'error',
        }),
        new transports.File({
            filename : path.join(logsdir, 'combined.log'),
            level : 'info',
        }),
    ],
});

// if (process.env.NODE_ENV !== "production") {
//   logger.add(
//     new winston.transports.Console({
//       format: winston.format.simple(),
//     })
//   );
// }
logger.info("Logger initialized successfully");
export default logger;
