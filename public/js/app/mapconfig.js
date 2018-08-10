function mapConfig(google) {
    return {
        center: new google.maps.LatLng(37.971741, 23.725239),
        zoom: 12,
        zoomControl: true,
        zoomControlOptions: {
            style: google.maps.ZoomControlStyle.DEFAULT,
            position: google.maps.ControlPosition.RIGHT_TOP
        },
        disableDefaultUI: true,
        disableDoubleClickZoom: false,
        mapTypeControl: false,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
        },
        scaleControl: false,
        scrollwheel: true,
        panControl: true,
        streetViewControl: false,
        draggable: true,
        overviewMapControl: false,
        overviewMapControlOptions: {
            opened: false
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        styles: [{
            "featureType": "all",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#BFB9B9"
            }]
        },
        {
            "featureType": "all",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 6
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "administrative",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#144b53"
            }, {
                "lightness": 14
            }, {
                "weight": 1.4
            }]
        },
        {
            "featureType": "administrative.province",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative.neighborhood",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "administrative.land_parcel",
            "elementType": "geomentry",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "landscape",
            "elementType": "all",
            "stylers": [{
                "color": "#08304b"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "poi",
            "elementType": "labels.icon",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#0b434f"
            }, {
                "lightness": 25
            }]
        },
        {
            "featureType": "road.highway",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.fill",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "labels.text",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "road.arterial",
            "elementType": "geometry.stroke",
            "stylers": [{
                "color": "#0b3d51"
            }, {
                "lightness": 16
            }]
        },
        {
            "featureType": "road.local",
            "elementType": "geometry",
            "stylers": [{
                "color": "#000000"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.fill",
            "stylers": [{
                "color": "#146474"
            }]
        },
        {
            "featureType": "transit.line",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "transit",
            "elementType": "labels.text.stroke",
            "stylers": [{
                "color": "#000000"
            }, {
                "lightness": 6
            }]
        },
        {
            "featureType": "transit.station.airport",
            "elementType": "geometry",
            "stylers": [{
                "visibility": "off"
            }]
        },
        {
            "featureType": "water",
            "elementType": "all",
            "stylers": [{
                "color": "#021019"
            }]
        }
        ]
    };
}

export default mapConfig;
