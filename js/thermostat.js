$(document).ready(function() {
	getTempTh();
});

$(function() {
	$(".knobTempSelector").knob({
		'min':150,
		'max':270,
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
	// Rendi visibile termostato manuale
}

function btnSchedule() {
	// Rendi invisibile termostato manuale e metti icona calendario o qualcosa
	//document.getElementById('buttonAuto').setAttribute('disabled', 'disabled');
	$.post("../api/thermostat/setActivationSchedule.php", {tempValue:val}, function (data) {});
}

function btnOff() {
	// Rendi invisibile termostato manuale
	//document.getElementById('buttonAuto').setAttribute('disabled', 'disabled');
	$.post("../api/thermostat/setActivationOff.php", {tempValue:val}, function (data) {});
}

// Get temperature
function getTempTh() {
	$.get( "../api/sensors/getThSensorValue.php", function ( data ) {
		var split = data.split('.');
		var int = split[0];
		var dec = split[1];
		$("label[for='thTempValue']").html(int + "." + dec + "<strong>&deg;</strong>");
	});
};