import $ from 'jquery';

$('#loginForm input').on('keydown', function(e) {
    if (e.keyCode == 13 || e.which == 13) {
        const empties = $.makeArray($('#loginForm input')).some(function(input) {
            return input.value == '';
        });

        $('#formSubmit').trigger('click');

        if (empties) {
            e.preventDefault();
        }
    }
});
