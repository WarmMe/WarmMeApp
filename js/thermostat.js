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
	$("label[for='tempValue']").html(val/10);
}

// Set temperature to DB
function writeTemp(val) {
	alert(val);
	$.post("../api/thermostat/setTargetTemperature.php", {tempValue:val}, function (data) {});
}

function disableBtnManual() {
	document.getElementById('buttonManual').setAttribute('disabled', 'disabled');
}


function disableBtnAuto() {
	document.getElementById('buttonAuto').setAttribute('disabled', 'disabled');
}

function disableBtnAll() {
	document.getElementById('buttonAuto').setAttribute('disabled', 'disabled');
	document.getElementById('buttonManual').setAttribute('disabled', 'disabled');
}