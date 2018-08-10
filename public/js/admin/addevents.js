import $ from 'jquery';

$(document).ready(function () {
    $('.date-picker').daterangepicker({
        singleDatePicker: false,
        calender_style: "picker_4",
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function (start, end, label) {
    });
});

$(document).ready(function () {
    $('#start_time').clockpicker({
        placement: 'left',
        align: 'top',
        autoclose: true
        //'default': '21:30'
    });
    $('#end_time').clockpicker({
        placement: 'left',
        align: 'top',
        autoclose: true
    });
});

$(".chosen-select").chosen();
