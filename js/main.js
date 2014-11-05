$(document).ready(function() {
	refreshTemp();
	refreshTime();
	refreshStatus();
});

// Get temperature
function getTemp() {
	$.get( "../api/sensors/getThSensorValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1];
		$("label[for='thermometer']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
	
	// Debug without pi
	$("label[for='thermometer']").html("20.5<strong>&deg;</strong>");
};

// Get status
function getStatus() {
	/*
	$.get( "../api/sensors/getActivationStatus.php", function ( data ) {
		if data="ON"
			label icona ->  class="flameicon icon-fire pulse1
	});
	*/
};

// Get temperature
function refreshTemp() {
	getTemp();
	setTimeout(refreshTemp,5000);
};

// Get Date-Time clock
function refreshTime() {
	var currentdate = new Date();
	var date = currentdate.getDate() + "/"
	+ (currentdate.getMonth()+1)  + "/"
	+ currentdate.getFullYear();

	var time = currentdate.getHours() + ":"
	+ currentdate.getMinutes() + ":"
	+ currentdate.getSeconds();
	$("label[for='date&time']").html(date + ", " + time);
	
	setTimeout(refreshTime,1000);
};