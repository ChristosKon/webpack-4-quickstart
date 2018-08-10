const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./webpack.config.base')('admin');

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
    main: [
        'admin.js',
        'admin.css'
    ],
    adminlogin: [
        'login.css'
    ],
    dashboard: [
        'dashboard.js',
    ],
    editevents: [
        'editevents.js',
    ],
    addevents: [
        'addevents.js',
    ],
    editposts: [
        'editposts.js'
    ],
    addUser: [
        'addUser.js'
    ]
};

config.resolve.alias = {
    'datatables.net': 'gentelella/vendors/datatables.net/js/jquery.dataTables',
    'datatables.net-bs': 'gentelella/vendors/datatables.net-bs/js/dataTables.bootstrap',
    'datatables.net-buttons': 'gentelella/vendors/datatables.net-buttons/js/dataTables.buttons',
    'datatables.net-responsive': 'gentelella/vendors/datatables.net-responsive-bs/js/responsive.bootstrap',
};

/*
 * Automatically extract the entries that need optimisation, in order to make
 * it easier for other people to add entries
 */
var entriesToOptimise = Object.keys(config.entry);
entriesToOptimise.splice(entriesToOptimise.indexOf('vendor'), 1);

/* Separate common modules from vendor modules */
config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'common',
    chunks: entriesToOptimise,
    minChunks: function(module, count) {
        return !isExternal(module) && count >= 2;
    }
}));

config.plugins.push(new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    chunks: entriesToOptimise,
    minChunks: function(module, count) {
        return isExternal(module);// && count >= 2;
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
