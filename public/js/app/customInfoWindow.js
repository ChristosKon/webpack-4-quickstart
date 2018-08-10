import $ from 'jquery';
import colorsConfig from './colorsconfig.js';

function getColorFor(type) {
    let color = colorsConfig[type];
    return (color !== undefined)
        ? color
        : '#fff';
}

function customiseInfoWindow(google, iw) {
    /*
     * The google.maps.event.addListener() event waits for
     * the creation of the infowindow HTML structure 'domready'
     * and before the opening of the infowindow defined styles
     * are applied.
     */
    google.maps.event.addListener(iw, 'domready', function() {

        // Reference to the DIV which receives the contents of the infowindow using jQuery
        var iwOuter = $('.gm-style-iw');

        /* The DIV we want to change is above the .gm-style-iw DIV.
         * So, we use jQuery and create a iwBackground variable,
         * and took advantage of the existing reference to .gm-style-iw for the previous DIV with .prev().
         */
        var iwBackground = iwOuter.prev();

        // Taking advantage of the already established reference to
        // div .gm-style-iw with iwOuter variable.
        // You must set a new variable iwCloseBtn.
        // Using the .next() method of JQuery you reference the following div to .gm-style-iw.
        // Is this div that groups the close button elements.
        var iwCloseBtn = iwOuter.next();

        iwCloseBtn.html('<span>×</span>');

        iwCloseBtn.find('span').css({
            width: '100%',
            height: '100%',
            fontSize: '18px',
            position: 'absolute',
            lineHeight: '16px',
            textAlign: 'center',
            color: '#263238'
        });

        // Apply the desired effect to the close button
        iwCloseBtn.css({
            width: '16px',
            height: '16px',
            overflow: 'hidden',
            position: 'absolute',
            opacity: 1,
            right: '10px',
            top: '25px',
            borderRadius: '10px'
        });

        // The API automatically applies 0.7 opacity to the button after the mouseout event.
        // This function reverses this event to the desired value.
        iwCloseBtn.mouseout(function() {
            $(this).css({opacity: '1'});
        });

        // Remove the background shadow DIV
        iwBackground.children(':nth-child(2)').css({'display': 'none'});

        // Remove the white background DIV
        iwBackground.children(':nth-child(4)').css({'display': 'none'});

        // Moves the infowindow 15px to the right.
        iwOuter.parent().parent().css({left: '-15px'});

        // Moves the shadow of the arrow 76px to the left margin
        iwBackground.children(':nth-child(1)').attr('style', function(i, s) {
            return s + 'left: 154px !important;';
        });

        // Moves the arrow 76px to the left margin
        iwBackground.children(':nth-child(3)').attr('style', function(i, s) {
            return s + 'left: 154px !important;';
        });

        // Changes the desired color for the tail outline.
        // The outline of the tail is composed of two descendants of div which contains the tail.
        // The .find('div').children() method refers to all the div which are direct descendants of the previous div.
        iwBackground.children(':nth-child(3)').find('div').children().css({
            'box-shadow': `${getColorFor(iw._eventType)} 0px 0px 0px 2px`,
            'z-index': '1'
        });

        iwBackground.children(':nth-child(3)').find('div').css({'top': '-2px'});
    });

    return iw;
}

export default customiseInfoWindow;
