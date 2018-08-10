/*
 * Modified and improved code, based on this answer from stackoverflow:
 * http://stackoverflow.com/a/34609371/4651083
 */
import getCurrentLocation from './libs/location';
import notify from './notifications';

function addLocationButton(map) {
    var locationControl = document.createElement('div'),
        locatingInterval = null;

    function resetlocatingInterval() {
        clearInterval(locatingInterval);
        locatingInterval = null;
    }

    var button = document.createElement('button');
    button.style.backgroundColor = '#fff';
    button.style.border = 'none';
    button.style.outline = 'none';
    button.style.width = '28px';
    button.style.height = '28px';
    button.style.borderRadius = '2px';
    button.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
    button.style.cursor = 'pointer';
    button.style.marginRight = '10px';
    button.style.padding = '0';
    button.title = 'Κοντά μου';
    locationControl.appendChild(button);

    var icon = document.createElement('div');
    icon.style.margin = '5px';
    icon.style.width = '18px';
    icon.style.height = '18px';
    icon.style.backgroundImage = 'url(https://maps.gstatic.com/tactile/mylocation/mylocation-sprite-2x.png)';
    icon.style.backgroundSize = '180px 18px';
    icon.style.backgroundPosition = '0 0';
    icon.style.backgroundRepeat = 'no-repeat';
    button.appendChild(icon);

    google.maps.event.addListener(map, 'center_changed', function() {
        icon.style['background-position'] = '0 0';
    });

    button.addEventListener('click', function() {
        var imgX;

        if (locatingInterval) {
            return;
        }

        ga('send', {
            hitType: 'event',
            eventCategory: 'app',
            eventAction: 'nearby-button'
        });

        imgX = '0';
        locatingInterval = setInterval(function() {
            imgX = imgX === '-18' ? '0' : '-18';
            icon.style['background-position'] = imgX + 'px 0';
        }, 500);

        getCurrentLocation().then(function(coords) {
            map.setCenter(coords);
            map.setZoom(15);
            icon.style['background-position'] = '-144px 0';
        }).catch(function(error) {
            notify({
                message: error,
                timeout: 5000
            });
            icon.style['background-position'] = '0 0';
        }).then(function() {
            resetlocatingInterval();
        });
    });

    locationControl.index = 1;
    map.controls[google.maps.ControlPosition.RIGHT_TOP].push(locationControl);
}

export default addLocationButton;
