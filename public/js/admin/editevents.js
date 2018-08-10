import $ from 'jquery';

$(document).ready(function() {
    $('.date-picker').daterangepicker({
        singleDatePicker: true,
        calender_style: "picker_4",
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function(start, end, label) {});
});

$(document).ready(function() {
    $('.time_pick').clockpicker({
        placement: 'left',
        align: 'top',
        autoclose: true,
        'default': '21:30'
    });
});
