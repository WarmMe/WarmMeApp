$(document).ready(function() {
    getRecordsFromDB();
});

function addScheduleEntry(val) {
    //$.get('./scheduleEntry.html').then(function(responseData) {
    //    $('#scheduleMain').append($.get(responseData));
    //});
  
    $.get('scheduleEntry.html', function (data) {
        $("#scheduleMain").append(data);
    });
    
    if ($("#toReplace").length > 0){
        console.log("null");
    } else
        $("#toReplace").append("dassssssssdsadsadasdas");
    
    // set new ID
    //$('.scheduleEntry').attr('id', 'val.activationSchedule_id')
    //document.getElementById("#toReplace").id = 'id_new'
    //document.getElementById("#toReplace").html("<p>AAAAAAAAA</p>");
    
    // Get childrens
    //var children = $("#toReplace").children();
    //console.log($("#toReplace").children());
    //$(children).each(function(index, item) {
    //    console.log("aa");        
    //});
    //entry.id = val.activationSchedule_id;
    //console.log(entry.children)
};

function addNewScheduleEntry() {
    $.get('./scheduleEntry.html').then(function(responseData) {
        $('#scheduleMain').append(responseData);
    });
};

function deleteScheduleEntry(from) {
     from.parentNode.parentNode.removeChild(from.parentNode);
};

function insertScheduleEntry(from) {
     from.parentNode.parentNode.removeChild(from.parentNode);
};

function updateScheduleEntry(from) {
     from.parentNode.parentNode.removeChild(from.parentNode);
};

function getRecordsFromDB() {
    $.getJSON("ajax/../../api/thermostat/getSchedules.php", function(data) {
        var items = [];
        // Get schedules tag
        $.each(data.Schedules, function(key, val) {
            items.push(val);
            //console.log(val);
            // Get values array 
            addScheduleEntry(val);
        });
    });
};