import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import store from './state/mapstore.js';
import setUpAutotrack from 'setup-autotrack.js';
import './feedback.js';

const PAGENAME = 'app';

function renderApp() {
    const state = store.getState();
    ReactDOM.render(<App { ...state } pageName={PAGENAME} setUpAutotrack={setUpAutotrack}/>, document.getElementById('app'));
}

store.subscribe(renderApp);

renderApp();
