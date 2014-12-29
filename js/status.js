$(document).ready(function() {
	refreshTemp();
	getTarget();
	refreshStatus();
});

// Get temperature
function getTemp() {
	$.get( "../api/sensors/getTemperatureValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1];
		$("label[for='thermometer']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};

// Refresh temperature
function refreshTemp() {
	getTemp();
	setTimeout(refreshTemp,5000);
};

// Get temperature
function getTarget() {
	$.get( "../api/thermostat/getActivationTempratureTarget.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1];
		$("label[for='thermostat']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};

// Get status
function getStatus() {
	$.get( "../api/thermostat/getActivationStatus.php", function ( data ) {
		if (data == "ON")
			$("label[for='flameIcon']").toggleClass("icon-fire pulse1",true);
		else
			$("label[for='flameIcon']").toggleClass("icon-fire pulse1",false);
	});
};

// Refresh Status
function refreshStatus() {
	getStatus();
	setTimeout(refreshStatus,2000);
};

// Get Date-Time clock
/*
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
*/