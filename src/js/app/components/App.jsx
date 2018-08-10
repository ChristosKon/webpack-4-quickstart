import $ from 'jquery';
import React, { Component } from 'react';
import Map from './Map.jsx';
import SidebarContainer from './SidebarContainer.jsx';
import Content from './Content.jsx';
import LoadingOverlay from './LoadingOverlay.jsx';
import SubscriptionPrompt from './SubscriptionPrompt.jsx';
import TransitionGroup from 'react-addons-transition-group';
import EventsList from './EventsList.jsx';
import docCookies from '../libs/cookies';
import moment from 'moment';
import notify from '../notifications';
import ModeSwitchButtonContainer from './ModeSwitchButtonContainer.jsx';

const dayDuration = 1000 * 60 * 60 * 24;

window.React = React;

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            subPromptVisible: (docCookies.getItem('subscriber') !== 'true')
                ? true
                : false,
            events: {}
        };

        this.currentlyVisibleEvents = [];
        this.hideSubPrompt = this.hideSubPrompt.bind(this);
    }

    componentDidMount() {
        /*
         * Set up autotrack after React DOM is created
         */
        this.props.setUpAutotrack(this.props.pageName);

        if (process.env.NODE_ENV === 'production') {
            $.getJSON("/test/test.json", (json) => {
                this.setState({
                    events: this.generateNormalisedResults(json),
                    loading: false
                });
            });
        } else {
            console.time('Request total time');
            $.getJSON("/test/test.json", (json) => {

                //Simulate network lag
                setTimeout(() => {
                    console.timeEnd('Request total time');

                    console.time('Results array creation total time');
                    let events = this.generateNormalisedResults(json);
                    console.timeEnd('Results array creation total time');
                    this.setState({
                        events: events,
                        loading: false
                    });
                }, 1000);
            });
        }

        window.addEventListener('load', function() {

            /*
             * We do these on load to ensure that mdl has finished loading first
             * (mdl initialises on the 'load' event too, but since we have already
             * loaded its code, it has registered its callback first and will execute
             * first as well)
             */
            const layout = document.querySelector('.mdl-layout');
            const MaterialLayout = layout.MaterialLayout;

            let oldToggleDrawer = MaterialLayout.toggleDrawer;

            function closeDrawer() {
                MaterialLayout.toggleDrawer('close');
            }

            function openDrawer() {
                MaterialLayout.toggleDrawer('open');
            }

            /* Monkey patch toggle Drawer to work as open/close */
            MaterialLayout.constructor.prototype.toggleDrawer = function(action) {
                let proto = this.constructor.prototype;
                switch (action) {
                    case 'open':
                        if (!this.drawer_.classList.contains(proto.CssClasses_.IS_DRAWER_OPEN)) {
                            oldToggleDrawer.call(this);
                        }
                        break;
                    case 'close':
                        if (this.drawer_.classList.contains(proto.CssClasses_.IS_DRAWER_OPEN)) {
                            oldToggleDrawer.call(this);
                        }
                        break;
                    default:
                        oldToggleDrawer.call(this);
                        break;
                }
                if (document.activeElement) {
                    document.activeElement.blur();
                }
            };

            $(MaterialLayout.drawer_).swipe({
                swipeLeft: closeDrawer,
                //Default is 75px, set to 0 for demo so any distance triggers swipe
                threshold: 75
            });

            $(MaterialLayout.obfuscator_).swipe({
                swipeLeft: closeDrawer,
                preventDefaultEvents: false,
                threshold: 0
            });
        });

        $('#help_button').on('click', function(e) {
            const $this = $(this);
            const maxHeight = $('.mdl-navigation .menu-area').outerHeight();
            const $legend = $('.sidebar-footer__legend');

            if (!$this.hasClass('active')) {
                $legend.css({
                    maxHeight: maxHeight + 'px'
                });
            }

            $legend.slideToggle({
                start: function() {
                    $this.toggleClass('active');
                }
            });
        });
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.mode === this.props.mode) {
            if (!this.currentlyVisibleEvents.length) {
                notify({message: 'Ουπς! Δεν υπάρχουν διαθέσιμα events με βάση τα φίλτρα σου 😕'});
            }
        }
    }

    filterEvents(filters) {
        let currentlyVisibleEvents = [],
            events = this.state.events;

        function filterByType(filters, events, currentlyVisibleEvents) {
            if (filters.showAll) {
                return currentlyVisibleEvents;
            }
            return currentlyVisibleEvents.filter(function(eventID) {
                let event = events[eventID];

                return filters.typeFilters.some(function(filter) {
                    if (filter.name === event.type) {
                        return filter.checked;
                    } else {
                        return false;
                    }
                });
            });
        }

        function filterByDate(state, events) {
            var currentDate = moment(state.date).valueOf(),
                offsetMin = moment(currentDate).add(12, 'hours').valueOf(),
                offsetMax = moment(currentDate).add(1, 'days').add(12, 'hours').valueOf(),
                newCurrentlyVisibleEvents = [];

            for (let key in events) {
                if (events.hasOwnProperty(key)) {
                    let event = events[key];

                    var eventStartDate = new Date(event.startDate).getTime(),
                        eventEndDate = new Date(event.endDate).getTime(),
                        matched = false;

                    if (event.recurring) {
                        if (eventStartDate <= currentDate && currentDate <= eventEndDate) {
                            matched = true;
                        }
                    } else {
                        if (offsetMin < event.start && event.start <= offsetMax) {
                            matched = true;
                        }
                    }
                    if (matched) {
                        newCurrentlyVisibleEvents.push(parseInt(key));
                    }
                }
            }

            return newCurrentlyVisibleEvents;
        }

        function filterCurrent(state, events) {
            var currentMoment = new Date().getTime(),
                newCurrentlyVisibleEvents = [];

            function transposeEventInstanceToDate(event, date) {
                var dateToString = moment(date).format('YYYY-MM-DD'),
                    eventInstanceStart = moment(dateToString + ' ' + event.startTime, 'YYYY-MM-DD HH:mm').valueOf(),
                    eventInstanceEnd = eventInstanceStart + event.durationPerInstance;

                return {startTime: eventInstanceStart, endTime: eventInstanceEnd};
            }

            function isInRange(currentDate, currentMoment, event) {
                var transposedEventInstance = transposeEventInstanceToDate(event, currentDate);

                if (transposedEventInstance.startTime <= currentMoment && currentMoment < transposedEventInstance.endTime) {
                    return true;
                } else {
                    return false;
                }
            }

            for (let key in events) {
                if (events.hasOwnProperty(key)) {
                    let event = events[key];
                    var eventStartDate = new Date(event.startDate).getTime(),
                        eventEndDate = new Date(event.endDate).getTime(),
                        matched = false;

                    if (eventStartDate === eventEndDate) {
                        if (event.start <= currentMoment && currentMoment < event.end) {
                            matched = true;
                        }
                    } else {
                        if (eventStartDate <= state.date && state.date <= eventEndDate) {
                            matched = isInRange(state.date, currentMoment, event) || isInRange(state.date - dayDuration, currentMoment, event);
                        }
                    }
                    if (matched) {
                        newCurrentlyVisibleEvents.push(parseInt(key));
                    }
                }
            }

            return newCurrentlyVisibleEvents;
        }

        if (Object.keys(events).length > 0) {
            if (process.env.NODE_ENV !== 'production') {
                console.time('Event filtering');
            }
            if (filters.now) {
                currentlyVisibleEvents = filterCurrent(filters, events);
            } else {
                currentlyVisibleEvents = filterByDate(filters, events);
            }
            currentlyVisibleEvents = filterByType(filters, events, currentlyVisibleEvents);
            if (process.env.NODE_ENV !== 'production') {
                console.timeEnd('Event filtering');
            }
        }
        return currentlyVisibleEvents;
    }

    hideSubPrompt(temporarily) {
        if (temporarily) {
            if (process.env.NODE_ENV !== 'production') {
                docCookies.setItem('subscriber', 'true', 60);
            } else {
                docCookies.setItem('subscriber', 'true', 60 * 60 * 24 * 4);
            }
        } else {
            docCookies.setItem('subscriber', 'true', Infinity);
        }
        this.setState({subPromptVisible: false});
    }

    generateNormalisedResults(json) {
        let events = {};
        json.forEach((data, index) => {
            let event = this.generateEvent(data, index);
            events[event.id] = event;
        });
        return events;
    }

    generateEvent(data, index) {
        /*
         * data.[start, end]_time is a string formatted as HH:mm
         * date.event_[end, start]_time is a string formatted as 'YYYY,MM,DD'
         */

        var event = {
            type: data.abbr,
            title: data.title,
            description: data.description,
            startTime: data.start_time,
            endTime: data.end_time,
            venue: data.venue_name,
            address: data.venue_address,
            url: data.source_url,
            startDate: data.event_start_date.replace(/,/g, '-'),
            endDate: data.event_end_date.replace(/,/g, '-'),
            id: index,
            lat: data.venue_lat,
            long: data.venue_lng,
            slug: data.slug,
            typeName: data.type_name
        };

        event.recurring = ((event.startDate !== event.endDate) && (data.recurring === '1'));

        // Absolute starting point in time
        event.start = moment(event.startDate + ' ' + event.startTime, 'YYYY-MM-DD HH:mm').valueOf();

        // Duration per daily event instance
        event.durationPerInstance = ((event) => {
            function calcDuration(start, end) {
                var duration = (end < start)
                    ? moment(end).add(1, 'days').diff(moment(start))
                    : moment(end).diff(moment(start));
                return duration;
            }

            return calcDuration(event.start, moment(event.startDate + ' ' + event.endTime, 'YYYY-MM-DD HH:mm').valueOf());
        })(event);

        // Absolute ending point in time
        event.end = ((event) => {
            if (event.recurring) {
                return (moment(event.endDate + ' ' + event.startTime, 'YYYY-MM-DD HH:mm').valueOf() + event.durationPerInstance);
            } else {
                return event.start + event.durationPerInstance;
            }
        })(event);

        // Absolute duration of the event, from start point to end point
        event.durationTotal = event.end - event.start;

        return event;
    }

    render() {
        let modeFlag = (this.props.mode === 'map') ? false : true;
        this.currentlyVisibleEvents = this.filterEvents(this.props.filters);

        return (
            <div>
                <div className="mdl-layout mdl-js-layout mdl-layout--fixed-drawer">
                    <SidebarContainer
                        dateFilters={this.props.filters.dateFilters}
                        typeFilters={this.props.filters.typeFilters}
                        date={this.props.filters.date}
                        showAll={this.props.filters.showAll}/>
                    <Content>
                        <TransitionGroup component='div'>
                            {(this.state.loading)
                                ? <LoadingOverlay key="loadingOverlay"/>
                                : null}
                            {(this.state.subPromptVisible)
                                ? <SubscriptionPrompt handleClose={this.hideSubPrompt} key="subPrompt"/>
                                : null}
                        </TransitionGroup>
                        <Map
                            hidden={modeFlag}
                            events={this.state.events}
                            visibleEvents={this.currentlyVisibleEvents}
                            openInfowindow={this.props.openInfowindow} />
                        <EventsList
                            date={this.props.filters.date}
                            hidden={!modeFlag}
                            events={this.state.events}
                            visibleEvents={this.currentlyVisibleEvents} />
                        <ModeSwitchButtonContainer mode={this.props.mode} />
                    </Content>
                </div>
            </div>
        );
    }
}
App.propTypes = {
    mode: React.PropTypes.string,
    filters: React.PropTypes.object,
    openInfowindow: React.PropTypes.number,
    setUpAutotrack: React.PropTypes.func,
    pageName: React.PropTypes.string
};

if (process.env.NODE_ENV !== 'production') {
    window.$ = $;
}

export default App;
