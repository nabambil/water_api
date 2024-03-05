const {createLogger, transports, format} = require("winston");

const customFormat = format.combine(format.timestamp(),  format.printf((info) =>  {
    return `${info.timestamp} : [${info.level} - ${info.message}]`
}));

const logger = createLogger({
    format: customFormat,
    transports:[
        new transports.Console({level : 'warn'}),
        new transports.File({filename: 'app.log', level: 'warn'}),
    ]
});

module.exports = logger;