/*global google*/
import React, {Component} from 'react';
import moment from 'moment';
import mapConfig from '../mapconfig.js';
import customiseInfoWindow from '../customInfoWindow';
import addLocationButton from '../location-button';
import _ from 'lodash';
import loadJS from '../libs/loadJS';
import store from '../state/mapstore.js';
import {setOpenInfowindow, closeOpenInfowindow} from '../state/actions';

class Map extends Component {
    constructor(props) {
        super(props);

        this.map = {};
        this.markers = {};
        this.infoWindow = {};
        this.googleMapsAPI = {};

        this.initMap = this.initMap.bind(this);
        this.displayInfoWindow = this.displayInfoWindow.bind(this);
        this.closeInfoWindow = this.closeInfoWindow.bind(this);
    }

    componentDidMount() {
        loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyDx0H8IjJ4p5gYRszesXdIHFjAiIVbWaCU&q&language=el&extension=.js', this.initMap);
    }

    componentDidUpdate(prevProps, prevState) {
        if (process.env.NODE_ENV !== 'production') {
            console.time('Lodash operations');
        }
        let xor = _.xor(prevProps.visibleEvents, this.props.visibleEvents),
            noMoreVisible = _.intersection(xor, prevProps.visibleEvents),
            newlyVisible = _.intersection(xor, this.props.visibleEvents);
        if (process.env.NODE_ENV !== 'production') {
            console.timeEnd('Lodash operations');
        }

        noMoreVisible.forEach((eventID) => {
            this.setMarkerVisibility(this.props.events[eventID], false);
        });
        newlyVisible.forEach((eventID) => {
            this.setMarkerVisibility(this.props.events[eventID], true);
        });

        if (this.props.openInfowindow >= 0) {
            this.displayInfoWindow();
        } else {
            this.closeInfoWindow();
        }

        if (noMoreVisible.indexOf(this.infoWindow._eventID) >= 0) {
            store.dispatch(closeOpenInfowindow());
        }
    }

    initMap() {
        let google = this.googleMapsAPI = window.google;
        let config = mapConfig(google);
        google.maps.event.addDomListener(window, 'load', () => {
            this.map = new google.maps.Map(this.mapContainer, config);
            this.infoWindow = customiseInfoWindow(google, new google.maps.InfoWindow({maxWidth: 250}));
            addLocationButton(this.map);
            google.maps.event.addListener(this.map, 'click', () => {
                store.dispatch(closeOpenInfowindow());
            });
            google.maps.event.addListener(this.infoWindow,'closeclick', () => {
                store.dispatch(closeOpenInfowindow());
            });
        });
    }

    setMarkerVisibility(event, value) {
        if (this.markers[event.id]) {
            this.markers[event.id].setVisible(value);
        } else {
            if (value === true) {
                this.markers[event.id] = this.generateMarker(event);
                this.markers[event.id].setVisible(value);
            }
        }
    }

    displayInfoWindow() {
        if (this.infoWindow._eventID !== this.props.openInfowindow) {
            let event = this.props.events[this.props.openInfowindow];
            let marker = this.markers[event.id];

            this.infoWindow._eventType = event.type;
            this.infoWindow._eventID = event.id;
            this.infoWindow.setContent(marker._content);
            this.infoWindow.open(this.map, marker);
        }
    }

    closeInfoWindow() {
        if (this.infoWindow._eventID !== undefined) {
            this.infoWindow.close();
            this.infoWindow._eventID = undefined;
            this.infoWindow._eventType = undefined;
        }
    }

    generateMarker(event) {
        function capitalizeFirstLetter(string) {
            return string.charAt(0).toUpperCase() + string.slice(1);
        }

        let google = this.googleMapsAPI;
        let marker = new google.maps.Marker({
            map: this.map,
            position: new google.maps.LatLng(event.lat, event.long),
            icon: {
                url: `/img/event-icons/${event.type}.png`,
                scaledSize: new google.maps.Size(32, 32)
            }
        });
        marker._content = `<div class="iw-contents ${event.type}">
            <div class="iw-contents-type">${capitalizeFirstLetter(event.typeName)}</div>
            <h4>${event.title}</h4>
            <div class="iw-contents-container">
            <div>
            ${event.venue} : ${event.address}
            </div>
            <div style="margin-bottom: 0;">
            <em>
            ${moment(event.startDate, 'YYYY-MM-DD').format('ll')}
            ${ (event.recurring)
            ? ' - ' + moment(event.endDate, 'YYYY-MM-DD').format('ll')
            : ''} |
            ${event.startTime} - ${event.endTime}
            </em>
            </div>
            </div>
            <div class="iw-source-container clearfix text-center ${event.type}">
            <a class="btn pull-right" target="_blank"
            href="${window.location.origin}/events/${event.slug}">
            Πληροφορίες
            </a></div>
            </div>`;

        google.maps.event.addListener(marker, 'click', () => {
            store.dispatch(setOpenInfowindow(event.id));
        });

        return marker;
    }

    render() {
        return (<div style={(this.props.hidden)
            ? {
                display: 'none'
            }
            : {
                display: ''
            }} id="mymap" ref={(mapContainer) => {
                this.mapContainer = mapContainer;
            }}/>);
    }
}
Map.propTypes = {
    hidden: React.PropTypes.bool,
    events: React.PropTypes.object,
    visibleEvents: React.PropTypes.array,
    openInfowindow: React.PropTypes.number
};

export default Map;
