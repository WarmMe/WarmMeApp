$(document).ready(function() {
    getRecordsFromDB();
});

function addScheduleEntry(val) {

    var getEntryBlock = $.get('scheduleEntry.html', function (data) {
        $("#scheduleMain").append(data);
    });
    
    $.when(getEntryBlock).done(function() {
        // set new ID
        var divBlock = $('#toReplace')
        divBlock.attr('id', val.activationSchedule_id);

        // timePicker FROM
        var timePickerFrom = divBlock.children('#fromValue').clockpicker({
            placement: 'bottom',
            align: 'left',
            donetext: 'Done',
            autoclose: true,
            'default': val.startTime
        });
        divBlock.children("#fromValue").val(val.startTime);
                                
        // timePicker FROM
        var timePickerTo = divBlock.children('#toValue').clockpicker({
            placement: 'bottom',
            align: 'left',
            donetext: 'Done',
            autoclose: true,
            'default': val.endTime
        });
        divBlock.children("#toValue").val(val.endTime);

        divBlock.children("#tempValue").val(val.tempValue);
        
        // pass ID to onclick functions
        divBlock.children(".update").attr("onclick","updateScheduleEntry("+val.activationSchedule_id+")");
        divBlock.children(".delete").attr("onclick","deleteScheduleEntry(this,"+val.activationSchedule_id+")");
        
        $(".loader").hide();
    });
};

function addNewScheduleEntry() {
    $.get('./scheduleEntry.html').then(function(responseData) {
        $('#scheduleMain').append(responseData);
    });
};

function deleteScheduleEntry(fromElement, ID) {
     $.post( "../api/schedule/deleteSchedule.php", {
        idVal: ID
     });
     fromElement.parentNode.parentNode.removeChild(fromElement.parentNode);
};

function insertScheduleEntry(from) {
     from.parentNode.parentNode.removeChild(from.parentNode);
};

function updateScheduleEntry(ID) {
    console.log(document.getElementById(ID).children[1].value);
    $.post( "../api/schedule/updateSchedule.php", {
        fromVal: document.getElementById(ID).children[0].value,
        toVal: document.getElementById(ID).children[1].value,
        tempValue: document.getElementById(ID).children[2].value,
        idVal: ID
    });
    
    //$.post( "../api/schedule/updateSchedules.php", {
    //    from: $(ID).children("#fromValue").val(),
    //    to: fromElement.parentNode.children("#toValue").val(),
    //    tempValue: fromElement.parentNode.children("#tempValue").val()
    //});
    
    //console.log(ID);
    //console.log(document.getElementById(ID).children[0].value);
};

function getRecordsFromDB() {
    $.getJSON("ajax/../../api/schedule/getSchedules.php", function(data) {
        // Get schedules tag "Schedules"
        $.each(data.Schedules, function(key, val) {
            // Get values array 
            addScheduleEntry(val);
        });
    });
};