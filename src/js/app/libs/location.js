/*
 * Promise based location mechanism.
 */

// Conditionally load Bluebird on the user's machine as a Promise polyfill
if (typeof Promise === "undefined" || Promise.toString().indexOf("[native code]") === -1) {
    require.ensure(['bluebird'], function(require) {
        window.Promise = require('bluebird');
    }, 'bluebird');
}

function getCoords(position) {
    let coords = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
    };
    return coords;
}

function getErrorMessage(error) {
    let code = (error) ? error.code : void(0),
        message;

    switch (code) {
        case 1:
            message = 'You have denied permission to access your location.';
            break;
        case 2:
            message = 'Could not get your location. Make sure location is enabled.';
            break;
        case 3:
            message = 'Could not get your location. Timeout error.';
            break;
        default:
            message = 'Location was unavailable';
    }

    return message;
}

function getCurrentLocation() {
    return new Promise(function(resolve, reject) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                function(position) {
                    resolve(getCoords(position));
                },
                function(error) {
                    reject(getErrorMessage(error));
                }, {
                    timeout: 15000
                }
            );
        } else {
            reject(getErrorMessage());
        }
    });
}

export default getCurrentLocation;
