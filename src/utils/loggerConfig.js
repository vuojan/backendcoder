import winston from "winston"

winston.addColors({
    debug: 'grey',
    http: 'blue',
    info: 'green',
    warning: 'yellow',
    error: 'red',
    fatal: 'magenta'
});

const logLevels = {

    development: "debug",

    production: "info"
}

const logger = winston.createLogger({

    levels:{

        fatal: 0,
        error: 1,
        warning: 2,
        info: 3,
        http: 4,
        debug: 5
    },

    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.printf(({level, message}) => {
            return `${new Date()} [${level}] : ${message}`;
        })
    ),

    transports: [
        new winston.transports.Console({level: logLevels[`${process.env.NODE_ENV}`]}),
        new winston.transports.File({filename: "error.log", level: "error"})
    ]

})

  export const useLogger = (req,res,next) => {

    req.logger = logger

    next()
}

    //   req.logger.http( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
    //   req.logger.debug( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
    //   req.logger.info( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
    //   req.logger.warning( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
    //   req.logger.error( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)
    //   req.logger.fatal( `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`)

    // export const useLogger = (level = "debug") => {
    //     return (req, res, next) => {
    //         req.logger = logger;
    //         const logMessage = `Method: ${req.method}, URL: ${req.url}, Time: ${new Date()}`;
    
    //         switch (level) {
    //             case 'debug':
    //                 req.logger.debug(logMessage);
    //                 break;
    //             case 'http':
    //                 req.logger.http(logMessage); 
    //                 break;
    //             case 'info':
    //                 req.logger.info(logMessage);
    //                 break;
    //             case 'warning':
    //                 req.logger.warning(logMessage); 
    //                 break;
    //             case 'error':
    //                 req.logger.error(logMessage);
    //                 break;
    //             case 'fatal':
    //                 req.logger.fatal(logMessage);
    //                 break;
    //             default:
    //                 req.logger.debug(logMessage);
    //                 break;
    //         }
    
    //         next();
    //     };
    // };
    