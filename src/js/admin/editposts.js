import $ from 'jquery';

/**
 * Created by antony on 10/17/16.
 */
$(document).ready(function () {
    // Sets the HTML contents of the activeEditor editor
    tinyMCE.activeEditor.setContent('<span>some</span> html', {format: 'raw'});
});
