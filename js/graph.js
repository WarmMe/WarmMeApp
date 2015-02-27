$(document).ready(function() {
    getDailyGraph();
    $(".loader").fadeOut("slow");
});

function getDailyGraph() {
    
    $.getJSON("ajax/../../api/graphs/getDaily.php", function(data) {
        var counter = 0;
        var itemsPairs = [];
        // Get schedules tag
        $.each(data, function(key, val) {
            //console.log(val.created);
            //console.log(val.value);
            var pair = []
            pair.push(new Date(val.created));
            pair.push(parseFloat(val.value));
            itemsPairs.push(pair);
            //console.log(itemsPairs);
            counter++;
        });
       
        // Create flot dataset
        var dataset = [
            {
                label: "Temperature",
                data: itemsPairs,
                color: "#FF0000",
                //points: { fillColor: "#FF0000", show: true },
                lines: { show: true }
            }
        ];
         
        // Create flot options
        var options = {
            series: {
                shadowSize: 5
            },
            xaxis: {
                mode: "time",
                timeformat: "%H:%M",
                timezone: "browser",
                color: "black",       
                axisLabel: "Time",
                axisLabelUseCanvas: true,
            },
            grid: {
                hoverable: true,
                borderWidth: 3,
                mouseActiveRadius: 50,
                backgroundColor: { colors: ["#ffffff", "#EDF5FF"] },
            }
        };
        
        //$.plot($("#graph"), [[[0,21.375],[1,21.25],[2,21.187],[3,21.375],[4,21.312]]]);
        $.plot($("#graph"), dataset, options);
    });
    
    var previousPoint = null;
    $("#graph").bind("plothover", function (event, pos, item) {
        if (item) {
	       if (previousPoint != item.datapoint) {
		      previousPoint = item.datapoint;
		      $("#tooltip").remove();
		      showTooltip(item.pageX, item.pageY, '(' + item.datapoint[0] + ', ' + item.datapoint[1]+')');
	       }
        } else {
	       $("#tooltip").remove();
	       previousPoint = null;
        }
    });

    function showTooltip(x, y, contents) {
        $('<div id="tooltip">' + contents + '</div>').css( {
            position: 'absolute',
            display: 'none',
            top: y + 5,
            left: x + 5,
            border: '1px solid #fdd',
            padding: '2px',
            'background-color': '#fee',
            opacity: 0.80
        }).appendTo("body").fadeIn(200);
    }
};