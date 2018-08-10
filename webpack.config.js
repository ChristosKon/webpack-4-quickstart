'use strict';

const validate = require('webpack-validator');

const appConfig = require('./webpack.config.app');
const siteConfig = require('./webpack.config.site');
const adminConfig = require('./webpack.config.admin');
const blogConfig = require('./webpack.config.blog');

module.exports = [
    validate(appConfig),
    validate(siteConfig),
    validate(adminConfig),
    validate(blogConfig)
];
