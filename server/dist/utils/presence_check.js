"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = __importStar(require("dotenv"));
var config = dotenv.config({ path: '../config/.env' });
exports.presenceCheck = function (roaster) {
    return roaster.filter(function (m) { var _a; return m.clan.tag !== ((_a = config.parsed) === null || _a === void 0 ? void 0 : _a.CLAN_TAG); });
};
