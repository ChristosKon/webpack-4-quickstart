import $ from 'jquery';
import setUpAutotrack from './setup-autotrack.js';
import Clipboard from 'clipboard';
import { splitText, formatToHTML } from 'textformatter';

const PAGENAME = 'eventpage';

setUpAutotrack(PAGENAME);

document.getElementById('url-field').setAttribute('data-clipboard-text', window.location.href);

const URLbtn = new Clipboard('#url-field');
const $URLbtn = $('#url-field');

function showTooltip(title) {
    $URLbtn.tooltip({ title });
    $URLbtn.tooltip('show');
    setTimeout(function() {
        $URLbtn.tooltip('destroy');
    }, 2000);
}

URLbtn.on('success', function(e) {
    showTooltip('Copied!');
});

URLbtn.on('error', function(e) {
    showTooltip('Use CTRL + C instead');
});

const desc = document.getElementById('event-description');
const fortmatedText = formatToHTML(splitText(desc.textContent));

if (fortmatedText.trim() === '<p></p>') {
    desc.innerHTML = '<p class="m-t-2 text-center">Δεν υπάρχουν επιπλέον πληροφορίες για αυτό το event.</p>';
} else {
    desc.innerHTML = fortmatedText;
}

setTimeout(() => {
    desc.classList.remove('transparent');
}, 100);
