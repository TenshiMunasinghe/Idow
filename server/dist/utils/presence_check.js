"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.presenceCheck = void 0;
var config_1 = require("./config");
var presenceCheck = function (roaster) {
    return roaster.filter(function (m) { return m.clan.tag !== (config_1.parsed === null || config_1.parsed === void 0 ? void 0 : config_1.parsed.CLAN_TAG); });
};
exports.presenceCheck = presenceCheck;
