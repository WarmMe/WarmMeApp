$(document).ready(function() {
	//getGraph(24 ore a partire da ora);

	
	
	
	var d1 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}
	
	var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
	
	// A null signifies separate line segments
	
	var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
	
	$.plot("#graph", [ d1, d2, d3 ]);
	
	
	
});

//getGraph(val) {
function getGraph() {
		//var plot = $("#graph").plot(data, options).data("plot");
	
	var d1 = [];
	for (var i = 0; i < 14; i += 0.5) {
		d1.push([i, Math.sin(i)]);
	}
	
	var d2 = [[0, 3], [4, 8], [8, 5], [9, 13]];
	
	// A null signifies separate line segments
	
	var d3 = [[0, 12], [7, 12], null, [7, 2.5], [12, 2.5]];
	
	$.plot("#graph", [ d1, d2, d3 ]);
};