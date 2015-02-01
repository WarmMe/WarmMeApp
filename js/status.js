$(document).ready(function() {
	refreshTemp();
	refreshTarget();
	refreshStatus();
});

// Get temperature
function getTemp() {
	// Temperature
	$.get( "../api/sensors/getTemperatureValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1] || 0;
		$("label[for='thermometer']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
	// humidity
	$.get( "../api/sensors/getHumidityValue.php", function ( data ) {
                var humidity = data;
		if (humidity != 0)
			$("#humidityPanel").toggleClass("hidden", false);
                	$("label[for='humidity']").html(humidity + "<strong>%</strong>");
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
		if (status == "OFF")
			$("label[for='thermostat']").html("OFF");
		else if (status == "MANUAL")
			$.get( "../api/thermostat/getActivationManual.php", function (data) {
				var split = data.split('.');
				var int = split[0];
				var dec = split[1] || 0;
				$("label[for='thermostat']").html(int + "." + dec + "<strong>&deg;</strong> MANUAL");
			});
		else
	                $.get( "../api/thermostat/getActivationSchedule.php", function (data) {
                	        var split = data.split('.');
	                        var int = split[0];
	                        var dec = split[1] || 0;
				if (int != 0)
        	                	$("label[for='thermostat']").html(int + "." + dec + "<strong>&deg;</strong> SCHEDULE");
				else
					$("label[for='thermostat']").html("SCHEDULE,<br> Now Off");
			});
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
