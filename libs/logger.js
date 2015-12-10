var winston = require('winston');

var myCustomLevels = {
    levels: {
      station:	 0,
      component: 1,
      user:	 2,
      all: 	 99
    },
    colors: {
      station: 	 'magenta',
      component: 'cyan',
      user: 	 'grey'
    }
};

winston.addColors(myCustomLevels.colors);

var logger = new (winston.Logger)({
    levels: myCustomLevels.levels,
    transports: [
	new (winston.transports.Console)({
		level: 'all',
		colorize: true
    	}),
	new (winston.transports.File)({
		filename:'logs/weather-station.log',
		level: 'all',
		json:false,
		maxsize: 1024 * 1024 * 10, // 10MB
		timestamp: function() {
			return (new Date()).toLocaleString().slice(0, 24);
    		},
    		formatter: function(options) {
        		// Return string will be passed to logger.
        		return '[' + options.timestamp() +'] '+ options.level.toUpperCase() +': '+ (undefined !== options.message ? options.message : '') +
          			(options.meta && Object.keys(options.meta).length ? '\n\t'+ JSON.stringify(options.meta) : '' );
    		}
	})
    ]
});

module.exports = logger;
