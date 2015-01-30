$(document).ready(function() {
    getRecordsFromDB();
});

function addNewScheduleEntry() {
    entry = $.get('./scheduleEntry.html').then(function(responseData) {
        $('#scheduleMain').append(responseData);
    });
    entry.id = Math.floor(Math.random()*11)
};

function deleteScheduleEntry(from) {
     from.parentNode.parentNode.removeChild(from.parentNode);
};

function getElements() {
    var list = document.getElementsByClassName("something");
    for (var i = 0; i <= list.length; i++) {
            list[i].innerHTML = i;
    }
};

    getRecordsFromDB();