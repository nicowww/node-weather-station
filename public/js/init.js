var socket = io.connect('http://' + config.address + ':' + config.port);

socket.on('time', function (data) {
	$("#time").html(data.raw);
});

socket.on('sensor', function (data) {
	console.log("Incoming sensor data:", data.raw);
	$("#sensor").html(data.raw);
});

socket.on('luminosity', function (data) {
	console.log("Incoming luminosity data:", data.raw);
	$("#luminosity").html(data.raw);
});

socket.on('motionstart', function (data) {
	$("#motiontext").html("KO");
	$("#motionpicture").removeClass("fa-bell");
	$("#motionpicture").addClass("fa-warning");
	$("#motionstate").removeClass("navy-bg");
	$("#motionstate").addClass("red-bg");
});

socket.on('motionend', function (data) {
	$("#motiontext").html("OK");
	$("#motionpicture").removeClass("fa-warning");
	$("#motionpicture").addClass("fa-bell");
	$("#motionstate").removeClass("red-bg");
	$("#motionstate").addClass("navy-bg");
});

$('#ledSet').on('click',function(){
	var tmp = parseInt($('#ledDelay').val(),10);
	console.log("Setting LED Delay:",tmp);
	socket.emit('led',{delay:tmp});
});
