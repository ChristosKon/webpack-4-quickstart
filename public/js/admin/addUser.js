import $ from 'jquery';

$( document ).ready(function() {
    /*
     * This is a major bullshit issue from gentelela, which wraps our simple
     * radio buttons in shit, in order to apply some flat visual style.
     * As a result it obstructs direct access to the radio events, and
     * we have to work on the DOM that gets introduced by gentelela code.
     * This doesn't happen immediately, that's why we wrap our code in a
     * set Timeout
     */
    setTimeout(function() {
        const $venueAssociatedDiv = $('#venueAssociatedDiv');
        const $isOrganiserInput = $('#isOrganizer .iradio_flat-green input[value="1"]');

        $venueAssociatedDiv.hide();

        $('#isOrganizer .iCheck-helper').click(function(e){
            if ($isOrganiserInput.prop('checked')) {
                $venueAssociatedDiv.show();
            } else {
                $venueAssociatedDiv.hide();
            }
        });
    }, 2000);

});
