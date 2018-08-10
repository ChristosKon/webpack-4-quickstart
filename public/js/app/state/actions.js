/*
 * Action creators
 */
export function showByEventType(type) {
    return {
        type: 'SHOW_BY_EVENT_TYPE',
        payload: { type }
    };
}

export function showAll() {
    return {
        type: 'SHOW_ALL',
    };
}

export function changeDate(filter, date) {
    return {
        type: 'CHANGE_DATE',
        payload: {
            filter,
            date
        }
    };
}

export function changeMode(type) {
    return {
        type: 'CHANGE_MODE',
        payload: { type }
    };
}

export function setOpenInfowindow(eventID) {
    return {
        type: 'SET_OPEN_INFOWINDOW',
        payload: { eventID }
    };
}

export function closeOpenInfowindow() {
    return {
        type: 'CLOSE_OPEN_INFOWINDOW'
    };
}
