const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base')('site');

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
        'bootstrap',
        'bootstrap/dist/css/bootstrap.css'
    ],
    home: [
        'analytics.js',
        'home.js',
        'home.css'
    ],
    venues: [
        'analytics.js',
        'venues.js',
        'venue.css'
    ],
    privacy_tos: [
        'analytics.js',
        'privacy-tos.js',
        'privacy-tos.css'
    ],
    fof: [
        'analytics.js',
        '404.js',
        '404.css'
    ],
    eventpage: [
        'analytics.js',
        'eventpage.js',
        'eventpage.scss'
    ]
};

/* Separate common modules from vendor modules */
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: ['home', 'venues', 'privacy_tos', 'fof', 'eventpage'],
    minChunks: function(module, count) {
        return !isExternal(module) && count >= 2;
    }
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: ['home', 'venues', 'privacy_tos', 'fof', 'eventpage'],
    minChunks: function(module, count) {
        return isExternal(module) && count >= 2;
    }
}));
/************/

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
