import React, { Component } from 'react';
import store from '../state/mapstore.js';
import { changeMode } from '../state/actions';
import ModeSwitchButton from './ModeSwitchButton.jsx';

class ModeSwitchButtonContainer extends Component {
    constructor(props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount() {
        componentHandler.upgradeDom();
    }

    handleClick() {
        if (this.props.mode === 'map') {
            store.dispatch(changeMode('text'));
        } else {
            store.dispatch(changeMode('map'));
        }
    }

    render() {
        return(
            <ModeSwitchButton
                icon={(this.props.mode === 'map') ? 'view_list' : 'map'}
                tooltip={(this.props.mode === 'map') ? 'Αλλαγή σε λίστα' : 'Αλλαγή σε χάρτη'}
                handleClick={this.handleClick} />
        );
    }
}
ModeSwitchButtonContainer.propTypes = {
    mode: React.PropTypes.string
};

export default ModeSwitchButtonContainer;
