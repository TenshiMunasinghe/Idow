"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceCheck = void 0;
var lodash_1 = require("lodash");
var config_1 = __importDefault(require("./config"));
var presenceCheck = function (roaster) {
    var roasterArr = lodash_1.isArray(roaster)
        ? roaster
        : Object.keys(roaster).reduce(function (r, k) {
            return r.concat(roaster[k]);
        }, []);
    return roasterArr.filter(function (m) { return m.clan.tag !== (config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.CLAN_TAG); });
};
exports.presenceCheck = presenceCheck;
