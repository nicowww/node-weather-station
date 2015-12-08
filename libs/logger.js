var winston = require('winston');

var myCustomLevels = {
    levels: {
      Station: 0,
      Component: 1,
      User: 2,
      All: 99
    },
    colors: {
      Station: 'magenta',
      Component: 'cyan',
      User: 'grey'
    }
};

winston.addColors(myCustomLevels.colors);

var logger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    transports: [
                        new (winston.transports.Console)({
                                level: 'All',
                                colorize: true
                        }),
                        new (winston.transports.File)({
                                filename:'logs/weather-station.log',
                                level: 'All',
                                json:false
                        })
    ]
   /* ,
    exceptionHandlers: [
		new winston.transports.File({
			filename: 'logs/weather-station-exceptions.log',
			level: 'All'
		})
    ]*/
});

module.exports = logger;
