"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocClient = void 0;
var config_1 = require("./config");
var clashApi = require('clash-of-clans-api');
var token = 'COC_API_TOKEN_' + (process.env.NODE_ENV === 'production' ? 'PROD' : 'TEST');
exports.cocClient = clashApi({
    token: config_1.parsed ? config_1.parsed[token] : '',
});
