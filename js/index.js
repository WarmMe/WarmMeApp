$(document).ready(function() {
    
    // If portrait mode, go to graph
    sessionStorage.setItem("visualization", "portrait");
    
    window.onresize = function(event) {
        if ($(window).height() > $(window).width()) {
            if (sessionStorage.getItem("visualization") == "landscape") {
                if (sessionStorage.getItem("app") == "schedule") {
                    // android keyboard resize the window, so reimplement when issue is resolved
                    //loadSchedule();
                } else if (sessionStorage.getItem("app") == "status") {
                    loadStatus();
                } else if (sessionStorage.getItem("app") == "thermostat") {
                    loadThermostat();
                } else if (sessionStorage.getItem("app") == "graph") {
                    loadGraph();
                }
                sessionStorage.setItem("visualization", "portrait");
            }
        } else {
            if (sessionStorage.getItem("visualization") == "portrait") {
                // android keyboard resize the window, so reimplement when issue is resolved
                if (sessionStorage.getItem("app") != "schedule") {
                    $(".loader").fadeIn();
                    loadHorizontalGraph();
                    $(".loader").fadeOut("slow");
                    sessionStorage.setItem("visualization", "landscape");
                }
            }
        }
    }
});
    
function loadStatus() {
    sessionStorage.setItem("app", "status");
	$.get('./status.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadThermostat() {
    sessionStorage.setItem("app", "thermostat");
    $(".loader").show();
	$.get('./thermostat.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadSchedule() {
    sessionStorage.setItem("app", "schedule");
    $(".loader").show();
	$.get('./schedule.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadGraph() {
    sessionStorage.setItem("app", "graph");
    $(".loader").show();
	$.get('./graphs.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}

function loadHorizontalGraph() {
    $(".loader").show();
	$.get('./graphs.html').then(function(responseData) {
		$('#mainPanel').empty().append(responseData);
	});
}