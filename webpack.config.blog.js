const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base')('blog');

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
    blog: [
        'jqBootstrapValidation.js',
        'contact_me.js',
        'clean-blog.js',
        'clean-blog.css'
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
