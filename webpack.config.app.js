const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base')('app');

function isExternal(module) {
    var userRequest = module.userRequest;

    if (typeof userRequest !== 'string') {
        return false;
    }
    return userRequest.indexOf('node_modules') >= 0;
}

config.entry = {
    vendor: [
        'jquery',
        'jquery-ui',
        'jquery-ui/ui/widgets/datepicker.js',
        'jquery-ui/ui/i18n/datepicker-el.js',
        'jquery-touchswipe/jquery.touchSwipe',
        'bootstrap',
        'moment',
        'moment/locale/el.js',
        'material-design-lite/material.min.js',
        'bootstrap/dist/css/bootstrap.css',
        'jquery-ui/themes/base/datepicker.css',
        'jquery-ui/themes/base/theme.css',
        'spinkit/css/spinners/2-double-bounce.css'

    ],
    main: [
        'analytics.js',
        'index.jsx',
        'app.scss'
    ]
};

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: function(module, count) {
        return isExternal(module);// && count >= 2;
    }
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'manifest',
    filename: 'manifest.js'
}));

config.plugins.push(new ExtractTextPlugin('[name].bundle.css', {
    allChunks: true
}));

// Force moment.js to only load el locales instead of everything
// See http://stackoverflow.com/a/25426019/4651083
config.plugins.push(new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /el/));

module.exports = config;
