const {createLogger,transports,format} = require('winston');

const logger = createLogger({
    transports: [
        new transports.File({
            filename: 'info.log',
            level: 'info',
            format: format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            level: 'error',
            filename: 'error.log',
            format: format.combine(format.timestamp(),format.json())
        })
    ]
});

module.exports = logger;