import React, {Component} from 'react';

class ModeSwitchButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id="switch-mode-button-wrapper">
                <button onClick={this.props.handleClick} id="switch-mode-button" className="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored mdl-button--raised">
                    <i className="material-icons">{this.props.icon}</i>
                </button>
                <div className="mdl-tooltip mdl-tooltip--left" data-mdl-for="switch-mode-button">
                    {this.props.tooltip}
                </div>
            </div>
        );
    }
}
ModeSwitchButton.propTypes = {
    handleClick: React.PropTypes.func,
    icon: React.PropTypes.string,
    tooltip: React.PropTypes.string
};

export default ModeSwitchButton;
