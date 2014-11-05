function loadMain() {
	$.get('./main.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadMeteo() {}

function loadThermostat() {
	$.get('./thermostat.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadCalendar() {}

function loadStat() {}