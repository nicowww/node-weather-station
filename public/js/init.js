var socket = io.connect('http://' + config.address + ':' + config.port);

socket.on('news', function (data) {
	console.log(data);
});

socket.on('sensor', function (data) {
	console.log("Incoming sensor data:", data.raw);
	$("#inData").append(data.raw+"\r");
	$("#sensor").html(data.raw);
	//$("#tempData").html(data.raw);
	$("#inData").animate({scrollTop:$("#inData")[0].scrollHeight - $("#inData").height()},200);
});

$('#ledSet').on('click',function(){
	var tmp = parseInt($('#ledDelay').val(),10);
	console.log("Setting LED Delay:",tmp);
	socket.emit('led',{delay:tmp});
});
