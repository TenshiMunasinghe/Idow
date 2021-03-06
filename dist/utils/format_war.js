"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatWar = void 0;
var formatWar = function (war, id) {
    return (__assign(__assign({}, war), { spin_time: war.spin_time.toDate().toISOString(), id: id }));
};
exports.formatWar = formatWar;
