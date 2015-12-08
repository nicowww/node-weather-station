// initialize everything, web server, socket.io, filesystem, johnny-five
var express = require('express');
var helmet = require('helmet');
var app = express();
var server = app.listen(80);
var io = require('socket.io').listen(server);
var path = require('path');
var fs = require('fs');
var five = require("johnny-five");
var logger = require('./libs/logger.js');
var config = require('./config/config.js');

var board, led, sensor, motion;

logger.log('Station', 'Start Engine');

app.use(helmet());

app.use(express.static(__dirname + '/public'));

app.set('views', __dirname + '/views');

board = new five.Board();

// on board ready
board.on("ready", function() {
	logger.log('Station', 'Board connected');
	logger.log('Station', 'Init control & sensors');

	// init a led on pin 13, strobe every 1000ms
	led = new five.Led(config.pin_led).strobe(config.freq_led);

	// init Motion sensor
	motion = new five.Motion(config.pin_motion);
	
	sensor = new five.Sensor({
		pin: config.pin_sensor,
		freq: config.freq_sensor
	});

	logger.log('Station', 'Running');
});

app.get('/', function(req, res){
	res.render('index.ejs');
	logger.log('User', 'User enter');
});

// on a socket connection
io.sockets.on('connection', function (socket) {
	socket.emit('news', { hello: 'world' });
	
	// if board is ready
	if(board.isReady){
		// read in sensor data, pass to browser
		sensor.on("data",function(){
			var analogValueTemp = this.raw;
			var voltage = (analogValueTemp * 5.0) / 1024;
			var temperature = voltage * 100;
			socket.emit('sensor', { raw: Math.round(temperature) + 'C' });
			//console.info("Sensor: ".bot_note + "Send".warn);
		});

		// "calibrated" occurs once, at the beginning of a session,
 		motion.on("calibrated", function() {
   			logger.log("calibrated");
		});

		// "motionstart" events are fired when the "calibrated"
		// proximal area is disrupted, generally by some form of movement
		motion.on("motionstart", function() {
			logger.log("motionstart");
		});

		// "motionend" events are fired following a "motionstart" event
		// when no movement has occurred in X ms
		motion.on("motionend", function() {
			logger.log("motionend");
		});
	}

	// if led message received
	socket.on('led', function (data) {
		logger.log('Component', data);
		if(board.isReady){ led.strobe(data.delay); }
	});
});
