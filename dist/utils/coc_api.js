"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cocClient = void 0;
var config_1 = __importDefault(require("./config"));
var clashApi = require('clash-of-clans-api');
exports.cocClient = clashApi({
    token: config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.COC_API_TOKEN,
});
