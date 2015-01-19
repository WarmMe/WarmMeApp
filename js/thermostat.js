$(document).ready(function() {
	getTempTh();
	getTarget();
});

$(function() {
	$(".knobTempSelector").knob({
		'min':170,
		'max':250,
		'cursor':true,
		'angleOffset':30,
		'angleArc':300,
		'thickness': .3,
		'step':1,
		'displayInput': false,
		'fgColor': "#222222",
		'bgColor':"#AAAAAA",
		'change' : function (v) { setTemp(v); }
	});
});

// set temperature
function setTemp(val) {
	$("label[for='thTempValue']").html(val/10);
}

// Set temperature to DB
function writeTemp(val) {
	alert(val);
	$.post("../api/thermostat/setActivationManual.php", {tempValue:val}, function (data) {});
}

function btnManual() {
	alert("thermostat into manual");
	$.post("../api/thermostat/setActivationManual.php", {}, function (data) {});
}

function btnSchedule() {
	alert("thermostat into schedule mode");
	$.post("../api/thermostat/setActivationSchedule.php", {}, function (data) {});
}

function btnOff() {
	alert("thermostat Off");
	$.post("../api/thermostat/setActivationOff.php", {}, function (data) {});
}

// Get temperature
function getTempTh() {
	$.get( "../api/sensors/getTemperatureValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1] || 0;
		$("label[for='thTempValue']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};

// Get temperature
function getTarget() {
	$.get( "../api/thermostat/getActivationTempratureTarget.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1] || 0;
		$("label[for='thermostat']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};
