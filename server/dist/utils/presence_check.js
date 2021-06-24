"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var lodash_1 = require("lodash");
var config_1 = require("./config");
exports.presenceCheck = function (roaster) {
    var roasterArr = lodash_1.isArray(roaster)
        ? roaster
        : Object.keys(roaster).reduce(function (r, k) {
            return r.concat(roaster[k]);
        }, []);
    return roasterArr.filter(function (m) { var _a; return m.clan.tag !== ((_a = config_1.parsed) === null || _a === void 0 ? void 0 : _a.CLAN_TAG); });
};
