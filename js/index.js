function loadStatus() {
	$.get('./status.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadThermostat() {
	$.get('./thermostat.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadSchedule() {
	$.get('./schedule.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadGraph() {
	$.get('./graph.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}