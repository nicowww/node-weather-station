// initialize everything, web server, socket.io, filesystem, johnny-five
var express = require('express');
var helmet = require('helmet');
var logger = require('./libs/logger.js');
var config = require('./config/config.js');
var app = express();
var server = app.listen(config.port);
var io = require('socket.io').listen(server);
var path = require('path');
var fs = require('fs');
var five = require("johnny-five");
var os = require('os');
var temporal = require("temporal");
var moment = require('moment');

var board, led, sensor, motion;

logger.log('station', 'Start Engine');

app.use(helmet());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/config'));

app.set('views', __dirname + '/views');

moment.locale('fr');

board = new five.Board();

// on board ready
board.on("ready", function() {
	logger.log('station', 'Board connected');
	logger.log('station', 'Init control & sensors');

	// init a led on pin 13, strobe every 1000ms
	led = new five.Led(config.pin_led).strobe(config.freq_led);

	// init Motion sensor
	motion = new five.Motion(config.pin_motion);

	// init temperature sensor
	sensor = new five.Sensor({
		pin: config.pin_sensor,
		freq: config.freq_sensor
	});

	// init luminosity sensor
	luminosity = new five.Sensor({
		pin: config.pin_luminosity,
		freq: config.freq_luminosity
	});

	logger.log('station', 'Running');
});

app.get('/', function(req, res){
	res.render('index.ejs', {hostname: os.hostname()});
});

// on a socket connection
io.sockets.on('connection', function (socket) {
	logger.log('user', 'a user connected');

	temporal.loop(1000, function() {
		socket.emit('time', { raw: moment().format('LLLL')});
	});

	// if board is ready
	if(board.isReady){

		// read in sensor data, pass to browser
		sensor.on("data",function(){
			var analogValueTemp = this.raw;
			var voltage = (analogValueTemp * 5.0) / 1024;
			var temperature = voltage * 100;
			socket.emit('sensor', { raw: Math.round(temperature) + '°C' });
			//logger.log('component', Math.round(temperature) + 'C');
		});

		luminosity.on("data", function(){
			var percent = ((1023 - this.value) / 1024) * 100;
			socket.emit('luminosity', { raw: Math.round(percent) + '%'});
			//logger.log('component', percent + '%');
		});

		// "calibrated" occurs once, at the beginning of a session,
		motion.on("calibrated", function() {
			logger.log('component', 'calibrated');
		});

		// "motionstart" events are fired when the "calibrated"
		// proximal area is disrupted, generally by some form of movement
		motion.on("motionstart", function() {
			logger.log('component', 'motionstart');
			socket.emit('motionstart');
		});

		// "motionend" events are fired following a "motionstart" event
		// when no movement has occurred in X ms
		motion.on("motionend", function() {
			logger.log('component', 'motionend');
			socket.emit('motionend');
		});
	}

	// if led message received
	socket.on('led', function (data) {
		logger.log('component', data);
		if(board.isReady){ led.strobe(data.delay); }
	});
});
