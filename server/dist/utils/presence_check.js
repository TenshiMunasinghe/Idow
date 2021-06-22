"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("./config");
exports.presenceCheck = function (roaster) {
    return roaster.filter(function (m) { var _a; return m.clan.tag !== ((_a = config_1.parsed) === null || _a === void 0 ? void 0 : _a.CLAN_TAG); });
};
