import React from 'react';
import SimpleOption from './SimpleOption.jsx';
import DatepickerOption from './DatepickerOption.jsx';
import store from '../state/mapstore.js';
import { changeDate } from '../state/actions';
import moment from 'moment';

function DateFilter({ types, handleClick, date }) {
    function handleDateClick(e) {
        const value = e.target.value;

        if (value == 'now') {
            store.dispatch(changeDate(value, moment().startOf('day').valueOf()));
        } else if (value == 'today') {
            store.dispatch(changeDate(value, moment().startOf('day').valueOf()));
        } else if (value == 'tomorrow') {
            store.dispatch(changeDate(value, moment().startOf('day').add(1, 'days').valueOf()));
        }
    }

    function handleDatepickerDateSelection(date) {
        store.dispatch(changeDate('other-day', moment(date).startOf('day').valueOf()));
    }

    const filters = types.map(function(filter, index) {
        if (filter.name === 'other-day') {
            return (
                <DatepickerOption
                    { ...filter }
                    key={filter.name}
                    date={date}
                    onDateSelection={handleDatepickerDateSelection} />
            );
        } else {
            return (
                <SimpleOption
                    { ...filter }
                    key={filter.name}
                    id={`${filter.name}-filter`}
                    value={filter.name}
                    onChange={handleDateClick}
                    type="radio" />
            );
        }
    });

    return (
        <div>
            {filters}
        </div>
    );
}
DateFilter.propTypes = {
    types: React.PropTypes.array,
    handleClick: React.PropTypes.func,
    date: React.PropTypes.number
};

export default DateFilter;
