import { createStore } from 'redux';
import moment from 'moment';

const filtersInitialState = {
    date: moment().startOf('day').valueOf(),
    now: false,
    dateFilters: [
        {
            name: 'now',
            desc: 'Τώρα',
            checked: false
        },
        {
            name: 'today',
            desc: 'Σήμερα',
            checked: true
        },
        {
            name: 'tomorrow',
            desc: 'Αύριο',
            checked: false
        },
        {
            name: 'other-day',
            desc: 'Άλλη μέρα',
            checked: false
        }
    ],
    typeFilters: [
        {
            name: 'food',
            desc: 'Food event',
            isNew: false,
            checked: false
        },
        {
            name: 'standup',
            desc: 'Stand-up comedy',
            isNew: false,
            checked: false
        },
        {
            name: 'latin',
            desc: 'Λάτιν',
            isNew: false,
            checked: false
        },
        {
            name: 'traditional',
            desc: 'Παραδοσιακό γλέντι',
            isNew: false,
            checked: false
        },
        {
            name: 'theater',
            desc: 'Παράσταση',
            isNew: false,
            checked: false
        },
        {
            name: 'party',
            desc: 'Πάρτι',
            isNew: false,
            checked: false
        },
        {
            name: 'movie',
            desc: 'Προβολή ταινίας',
            isNew: false,
            checked: false
        },
        {
            name: 'live',
            desc: 'Συναυλία - Live',
            isNew: false,
            checked: false
        },
        {
            name: 'student',
            desc: 'Φοιτητικό πάρτι',
            isNew: false,
            checked: false
        },
        {
            name: 'other',
            desc: 'Άλλα',
            isNew: false,
            checked: false
        }
    ],
    showAll: true,
};

function mode(state = 'map', action) {
    switch (action.type) {
        case 'CHANGE_MODE':
            return (action.payload.type === state) ? state : action.payload.type;
        case 'SET_OPEN_INFOWINDOW':
            return 'map';
        default:
            return state;
    }
}

/*
 * Filters reducer
 */
function filters(state = filtersInitialState, action) {

    switch (action.type) {
        case 'CHANGE_DATE':
            return Object.assign({}, state, {
                date: action.payload.date || state.date,
                now: (action.payload.filter === 'now') ? true : false,
                dateFilters: state.dateFilters.map(function(filter) {
                    if (action.payload.filter === filter.name) {
                        return Object.assign({}, filter, {
                            checked: true
                        });
                    }
                    return Object.assign({}, filter, {
                        checked: false
                    });
                })
            });
        case 'SHOW_ALL':
            if (state.showAll) {
                return state;
            }
            return Object.assign({}, state, {
                showAll: true,
                typeFilters: state.typeFilters.map(function(filter) {
                    return Object.assign({}, filter, {
                        checked: false
                    });
                })
            });
        case 'SHOW_BY_EVENT_TYPE':
            return Object.assign({}, state, {
                showAll: false,
                typeFilters: state.typeFilters.map(function(filter) {
                    if (action.payload.type === filter.name) {
                        return Object.assign({}, filter, {
                            checked: !filter.checked
                        });
                    }
                    return filter;
                })
            });
        default:
            return state;
    }
}

function openInfowindow(state=undefined, action) {
    switch (action.type) {
        case 'SET_OPEN_INFOWINDOW':
            return (action.payload.eventID === state) ? state : action.payload.eventID;
        case 'CLOSE_OPEN_INFOWINDOW':
            return undefined;
        default:
            return state;
    }
}

/*
 * Main reducer
 */
function reducer(state = {}, action) {
    return {
        mode: mode(state.mode, action),
        filters: filters(state.filters, action),
        openInfowindow: openInfowindow(state.openInfowindow, action)
    };
}

/*
 * Create the store
 */
let store;

if (process.env.NODE_ENV !== 'production') {
    store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
} else {
    store = createStore(reducer);
}

export default store;
