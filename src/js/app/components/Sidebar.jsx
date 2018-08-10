import React from 'react';

function Sidebar(props) {
    function toRows(type) {
        return (
            <tr key={type.name}>
                <td>
                    <img width="32" src={`/img/event-icons/${type.name}.png`}/>
                </td>
                <td>
                    {type.desc}
                </td>
            </tr>
        );
    }

    let halfLength = Math.ceil(props.typeFilters.length / 2);
    let leftCol = props.typeFilters.slice(0, halfLength).map(toRows);
    let rightCol = props.typeFilters.slice(halfLength).map(toRows);

    return(
        <div className="mdl-layout__drawer">
            <div className="mdl-layout-title">
                <div className="logo-area">
                    <a href="/">
                        <img className="logo" src="/img/home/logo_without_symbol.svg" alt="Athens Night"/>
                    </a>
                </div>
            </div>
            <div className="mdl-navigation">
                <div className="menu-area">
                    <div className="filter-area">
                        <h4>
                            <img src="/img/map/date_filter.svg" width="16" height="16"/>
                            Ημερομηνία
                        </h4>
                        {props.DateFilterComponent}
                    </div>
                    <div className="filter-area">
                        <h4>
                            <img src="/img/map/event_filter.svg" width="16" height="16"/>
                            Τύπος εκδήλωσης
                        </h4>
                        {props.TypeFilterComponent}
                    </div>
                </div>
                <div className="sidebar-footer">
                    <div className="sidebar-footer__legend container-fluid" style={{'display': 'none'}}>
                        <div className="h4">
                            Υπόμνημα
                        </div>
                        <div className="row">
                            <div className="col-sm-6">
                                <table className="table">
                                    <tbody>
                                        {leftCol}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-6">
                                <table className="table">
                                    <tbody>
                                        {rightCol}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="sidebar-footer__actions clearfix">
                        <div className="sidebar-footer__action">
                            <a type="" id="feedback_button" className="" data-toggle="modal" data-target="#myModal">
                                <img src="/img/map/feedback.svg" className="regular" height="16"/>
                                <img src="/img/map/feedback_alt.svg" className="alt" height="16"/>
                                <div>
                                    Feedback
                                </div>
                            </a>
                        </div>
                        <div className="sidebar-footer__action">
                            <a type="" id="help_button" className="">
                                <img src="/img/map/help.svg" className="regular" height="16"/>
                                <img src="/img/map/help_alt.svg" className="alt" height="16"/>
                                <div>
                                    Βοήθεια
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
Sidebar.propTypes = {
    DateFilterComponent: React.PropTypes.node,
    TypeFilterComponent: React.PropTypes.node,
    typeFilters: React.PropTypes.array,
};

export default Sidebar;
