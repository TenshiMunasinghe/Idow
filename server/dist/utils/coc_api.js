"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var clashApi = require('clash-of-clans-api');
var config = dotenv.config({ path: '../config/.env' });
exports.cocClient = clashApi({
    token: (_a = config.parsed) === null || _a === void 0 ? void 0 : _a.COC_API_TOKEN,
});
