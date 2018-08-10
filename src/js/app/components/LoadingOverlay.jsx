import React, { Component } from 'react';
import createLoadingOverlay from '../libs/loading-overlay.js';

class LoadingOverlay extends Component {
    componentWillAppear(callback) {
        callback();
    }

    componentWillEnter(callback) {
        callback();
    }

    componentWillLeave(callback) {
        this.loadingOverlay.remove(callback);
    }

    componentDidMount() {
        this.loadingOverlay = createLoadingOverlay(this.DOMNode);
    }

    render() {
        return(
            <div ref={DOMNode => this.DOMNode = DOMNode}></div>
        );
    }
}
LoadingOverlay.propTypes = {};

export default LoadingOverlay;
