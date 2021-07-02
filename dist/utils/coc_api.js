"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocClient = void 0;
var config_1 = require("./config");
var clashApi = require('clash-of-clans-api');
console.log(process.env.NODE_ENV);
var options = process.env.NODE_ENV === 'production'
    ? {
        token: process.env.COC_API_TOKEN_PROD,
    }
    : { token: config_1.parsed === null || config_1.parsed === void 0 ? void 0 : config_1.parsed.COC_API_TOKEN_TEST };
exports.cocClient = clashApi(options);
