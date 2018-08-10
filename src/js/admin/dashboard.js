import $ from 'jquery';

/**
 * Created by antony on 10/7/16.
 */
$(document).ready(function () {
    $('#date_range').daterangepicker({
        calender_style: "picker_4",
        locale: {
            format: 'YYYY-MM-DD'
        }
    }, function (start, end, label) {
        console.log("New date range selected: ' + start.format('YYYY-MM-DD') + ' to ' + end.format('YYYY-MM-DD') + ' (predefined range: ' + label + ')");
    });
});
