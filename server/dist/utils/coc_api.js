"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
var clashApi = require('clash-of-clans-api');
exports.cocClient = clashApi({
    token: (_a = config_1.parsed) === null || _a === void 0 ? void 0 : _a.COC_API_TOKEN,
});
