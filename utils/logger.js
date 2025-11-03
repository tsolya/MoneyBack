const winston = require("winston")

const logger = winston.createLogger({
    level: 'silly',
    format: winston.format.combine(
    winston.format.colorize(),    
    winston.format.timestamp({format: 'YYYY-DD-MM HH:mm:ss'}),
    winston.format.printf(({timestamp,level,message} ) => {
            return `[${timestamp}] ${level} : ${message}`
    }),
),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'server.log' })
      ],
  });

module.exports = logger;