$(document).ready(function() {
	refreshTemp();
	refreshTarget();
	refreshStatus();
});

// Get temperature
function getTemp() {
	$.get( "../api/sensors/getTemperatureValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1] || 0;
		$("label[for='thermometer']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};

// Refresh temperature
function refreshTemp() {
	getTemp();
	setTimeout(refreshTemp,5000);
};

// Get target temperature
function getTarget() {
	$.get( "../api/thermostat/getActivationType.php", function (status) {
		console.log(status);
		if (status == "OFF")
			$("label[for='thermostat']").html("OFF");
		else if (status == "MANUAL")
		$.get( "../api/thermostat/getActivationTempratureTarget.php", function (data) {
			var split = data.split('.');
			var int = split[0];
			var dec = split[1] || 0;
			$("label[for='thermostat']").html(int + "." + dec + "<strong>&deg;</strong> MANUAL");
		});
		else
			$("label[for='thermostat']").html("SCHEDULE");
	});
};

// Refresh temperature
function refreshTarget() {
	getTarget();
	setTimeout(refreshTarget,5000);
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