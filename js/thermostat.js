$(document).ready(function() {
	getTempTh();
	getTarget();
	getActiveButton();
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
	$.post("../api/thermostat/setActivationManual.php", {tempValue:val}, function (data) {});
}

function btnManual() {
	$("#buttonSchedule").toggleClass("btn-success", false);
	$("#buttonOff").toggleClass("btn-success", false);	
	$("#buttonManual").toggleClass("btn-success", true);
	
	//alert("thermostat into manual");
	$.post("../api/thermostat/setActivationManual.php", {}, function (data) {});
}

function btnSchedule() {
	$("#buttonSchedule").toggleClass("btn-success", true);
	$("#buttonOff").toggleClass("btn-success", false);	
	$("#buttonManual").toggleClass("btn-success", false);
	
	//alert("thermostat into schedule mode");
	$.post("../api/thermostat/setActivationSchedule.php", {}, function (data) {});
}

function btnOff() {
	$("#buttonSchedule").toggleClass("btn-success", false);
	$("#buttonOff").toggleClass("btn-success", true);	
	$("#buttonManual").toggleClass("btn-success", false);
	
	//alert("thermostat Off");
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

// Get target temperature
function getActiveButton() {
	$.get( "../api/thermostat/getActivationType.php", function (status) {
		console.log(status);
		if (status == "OFF")
			$("#buttonOff").toggleClass("btn-success", true);
		else if (status == "MANUAL")
			$("#buttonManual").toggleClass("btn-success", true);
		else
			$("#buttonSchedule").toggleClass("btn-success", true);
	});
};
