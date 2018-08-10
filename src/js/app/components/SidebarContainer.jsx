import React from 'react';
import DateFilter from './DateFilter.jsx';
import TypeFilter from './TypeFilter.jsx';
import Sidebar from './Sidebar.jsx';

function SidebarContainer(props) {
    return(
        <Sidebar
            typeFilters={props.typeFilters}
            DateFilterComponent={
                <DateFilter
                    date={props.date}
                    types={props.dateFilters} />
            }
            TypeFilterComponent={
                <TypeFilter
                    showAll={props.showAll}
                    types={props.typeFilters} />
            }
            />
    );
}
SidebarContainer.propTypes = {
    dateFilters: React.PropTypes.array,
    typeFilters: React.PropTypes.array,
    date: React.PropTypes.number,
    showAll: React.PropTypes.bool
};

export default SidebarContainer;
