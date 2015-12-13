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

$('#ledSet').on('click',function(){
	var tmp = parseInt($('#ledDelay').val(),10);
	console.log("Setting LED Delay:",tmp);
	socket.emit('led',{delay:tmp});
});
