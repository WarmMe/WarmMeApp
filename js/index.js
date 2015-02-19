function loadStatus() {
	$.get('./status.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadThermostat() {
    $(".loader").show();
	$.get('./thermostat.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadSchedule() {
    $(".loader").show();
	$.get('./schedule.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadGraph() {
    $(".loader").show();
	$.get('./graphs.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}