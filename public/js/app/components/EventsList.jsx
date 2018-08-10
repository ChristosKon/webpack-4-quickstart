import React, {Component} from 'react';
import moment from 'moment';
import _ from 'lodash';
import store from '../state/mapstore.js';
import { changeMode, setOpenInfowindow } from '../state/actions';

class EventsList extends Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate() {
        componentHandler.upgradeDom();
    }

    render() {
        let events = [];
        const columns = 3;

        this.props.visibleEvents.forEach((eventID) => {
            let event = this.props.events[eventID];
            events.push(
                <div key={eventID} className={`iw-contents ${event.type}`} style={{marginBottom: '3rem'}}>
                    <div className="iw-contents-type">
                        {event.typeName} <img width="18" height="18" src={`/img/event-icons/${event.type}.png`}
                        style={{ float: 'right', position: 'relative', top: '1px'}} />
                    </div>
                    <h4>{event.title}</h4>
                    <div className="iw-contents-container">
                        <div>
                            <button
                                id={`open-to-map-${event.id}`}
                                onClick={() => {
                                    store.dispatch(setOpenInfowindow(event.id));
                                }}
                                className="mdl-button mdl-js-button mdl-button--icon show-in-map-button">
                                <i className="material-icons">place</i>
                            </button>
                            <div className="mdl-tooltip mdl-tooltip--top"
                                data-mdl-for={`open-to-map-${event.id}`}>
                                Εμφάνιση στον χάρτη
                            </div>
                            {event.venue}
                            : {event.address}
                        </div>
                        <div style={{
                            'marginBottom': 0
                        }}>
                            <em>
                                {moment(event.startDate, 'YYYY-MM-DD').format('ll')}
                                {(event.recurring)
                                    ? ' - ' + moment(event.endDate, 'YYYY-MM-DD').format('ll')
                                    : ''}
                                | {event.startTime}
                                - {event.endTime}
                            </em>
                        </div>
                    </div>
                    <div className={`iw-source-container clearfix text-center ${event.type}`}>
                        <a className="btn pull-right" target="_blank" href={`${window.location.origin}/events/${event.slug}`}>
                            Πληροφορίες
                        </a>
                    </div>
                </div>
            );
        });

        let chunkSize = parseInt(events.length / columns);
        if (chunkSize === 0) {
            chunkSize++;
        }
        let eventChunks = _.chunk(events, chunkSize);
        if (eventChunks.length >= columns) {
            eventChunks = eventChunks.reduce((acc, cur, index) => {
                if (index < columns) {
                    acc.push(cur);
                } else {
                    //this is a 2 min fix ofr an edgecase
                    let colIndex = index % columns;
                    if (cur.length === 2){
                        acc[colIndex] = acc[colIndex].concat(cur[0]);
                        acc[colIndex + 1] = acc[colIndex + 1].concat(cur[1]);
                    ////////
                    } else {
                        acc[colIndex] = acc[colIndex].concat(cur);
                    }

                }
                return acc;
            }, []);
        }

        let colGroups = eventChunks.map((chunk, index) => {
            return (
                <div key={`chunk-${index}`} className="col-md-4">
                    {chunk}
                </div>
            );
        });

        return (
            <div id="events-list" style={(this.props.hidden)
                ? {
                    display: 'none'
                }
                : {
                    display: ''
                }}>
                <div className="container-fluid">
                    <h2>{`${moment(this.props.date).format('dddd')} ${moment(this.props.date).format('LL')}`}</h2>
                    <div className="row" style={{
                        paddingTop: '1.5rem',
                        paddingBottom: '1.5rem'
                    }}>
                        {colGroups}
                    </div>
                </div>
            </div>
        );
    }
}
EventsList.propTypes = {
    date: React.PropTypes.number,
    hidden: React.PropTypes.bool,
    events: React.PropTypes.object,
    visibleEvents: React.PropTypes.array
};

export default EventsList;
