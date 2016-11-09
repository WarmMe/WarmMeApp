var timeDiff = (new Date()).getTimezoneOffset()/60;

function getLocalTime(utcTime) {
	var hour = utcTime.split(':')[0];
        var hourIta = parseInt(hour) - timeDiff;
        if (hourIta < 0) {
                hourIta = 24 - hourIta;
        } else if (hourIta > 24) {
		hourIta = hourIta - 24
	}
        var localTime = hourIta + ':' + utcTime.split(':')[1] + ':' + utcTime.split(':')[2];
        return localTime;
}

function getUtcTime(localTime) {
        var hour = localTime.split(':')[0];
        var hourIta = parseInt(hour) + timeDiff;
        if (hourIta > 24) {
                hourIta = hourIta - 24;
        } else if (hourIta < 0) {
		hourIta = 24 - hourIta;
	} 
        var utcTime = hourIta + ':' + localTime.split(':')[1] + ':' + localTime.split(':')[2];
        return utcTime;
}

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
        divBlock.children("#fromValue").val(getLocalTime(val.startTime));

        // timePicker FROM
        var timePickerTo = divBlock.children('#toValue').clockpicker({
            placement: 'bottom',
            align: 'left',
            donetext: 'Done',
            autoclose: true,
            'default': val.endTime
        });
        divBlock.children("#toValue").val(getLocalTime(val.endTime));
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
    $.post( "../api/schedule/updateSchedule.php", {
        fromVal: getUtcTime(document.getElementById(ID).children[0].value),
        toVal: getUtcTime(document.getElementById(ID).children[1].value),
        tempValue: document.getElementById(ID).children[2].value,
        idVal: ID
    });
    
console.log(getUtcTime(document.getElementById(ID).children[0].value));
console.log(getUtcTime(document.getElementById(ID).children[1].value));

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
