'use strict';

const webpack = require('webpack');
const path = require('path');
const SystemBellPlugin = require('system-bell-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const PATHS = {
    node_modules: path.resolve(__dirname, 'node_modules'),
    js: path.resolve(__dirname, 'public', 'js'),
    app: path.resolve(__dirname, 'public', 'js', 'app'),
    admin: path.resolve(__dirname, 'public', 'js', 'admin'),
    site: path.resolve(__dirname, 'public', 'js', 'site'),
    blog: path.resolve(__dirname, 'public', 'js', 'blog'),
    css: path.resolve(__dirname, 'public', 'css')
};

var ports = [];

function BaseConfig(name) {
    var port = Math.floor(Math.random() * (8999 - 8000 + 1)) + 8000;

    while (ports.indexOf(port) >= 0) {
        port = Math.floor(Math.random() * (8999 - 8000 + 1)) + 8000;
    }
    ports.push(port);

    PATHS.build = path.join(__dirname, 'public', 'build', name);

    var config = {
        output: {
            path: PATHS.build,
            publicPath: '/build/' + name + '/',
            filename: '[name].bundle.js'
        },
        resolve: {
            root: [
                path.resolve(__dirname),
                PATHS.node_modules,
                PATHS.js,
                PATHS.css,
                PATHS.app,
                PATHS.site,
                PATHS.admin,
                PATHS.blog
            ],
            extensions: ['', '.js', '.jsx', '.json', '.css', '.scss']
        },
        module: {
            loaders: [
                {
                    test: /\.css$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
                },
                {
                    test: /\.scss$/,
                    loader: ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader')
                },
                {
                    test: /\.png$/,
                    loader: 'url-loader?limit=100000'
                },
                {
                    test: /\.jpg$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.gif$/,
                    loader: 'file-loader'
                },
                {
                    test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/font-woff'
                },
                {
                    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=application/octet-stream'
                },
                {
                    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'file'
                },
                {
                    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                    loader: 'url?limit=10000&mimetype=image/svg+xml'
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react']
                    }
                }
            ]
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                jQuery: 'jquery',
                'window.jQuery': 'jquery',
                tether: 'tether',
                Tether: 'tether',
                'window.Tether': 'tether',
                moment: 'moment'
            }),
            new webpack.EnvironmentPlugin([
                'NODE_ENV'
            ]),
            new SystemBellPlugin()
        ]
    };

    if (process.env.NODE_ENV === 'production') {
        config.devtool = 'source-map';
        config.plugins.push(new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: true,
            },
            output: {
                comments: false,
            },
        }));
    } else {
        config.devtool = 'eval';
        config.debug = true;
        config.profile = true;
    }

    if (process.env.WEBPACK_STATS === 'true') {
        config.plugins.push(new BundleAnalyzerPlugin({
            analyzerPort: port,
            generateStatsFile: true,
            statsFilename: '../../../build_stats/' + name + '-stats.json'
        }));
    }

    return config;
}

module.exports = BaseConfig;
