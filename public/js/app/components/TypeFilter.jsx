import React from 'react';
import SimpleOption from './SimpleOption.jsx';
import TypeOption from './TypeOption.jsx';
import store from '../state/mapstore.js';
import { showByEventType, showAll as showAllAction} from '../state/actions';

function TypeFilter({ showAll, types }) {
    function handleClick(e) {
        const value = e.target.value;

        if (value === 'all') {
            store.dispatch(showAllAction());
        } else {
            store.dispatch(showByEventType(value));
        }
    }

    const options = types.map(function(filter, index) {
        return (
            <TypeOption
                { ...filter }
                key={filter.name}
                onChange={handleClick}
                checked={(showAll) ? false : filter.checked} />
        );
    });

    return (
        <div>
            <SimpleOption
                name="all"
                desc="Όλα"
                id="type1"
                value="all"
                checked={showAll}
                onChange={handleClick}
                type="checkbox" />
            {options}
        </div>
    );
}
TypeFilter.propTypes = {
    types: React.PropTypes.array,
    handleClick: React.PropTypes.func,
    showAll: React.PropTypes.bool
};

export default TypeFilter;
