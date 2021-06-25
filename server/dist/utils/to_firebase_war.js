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
exports.toFirebaseWar = void 0;
var firebase_1 = require("./firebase");
var toFirebaseWar = function (war) { return (__assign(__assign({}, war), { spin_time: firebase_1.toTimeStamp(new Date(war.spin_time)) })); };
exports.toFirebaseWar = toFirebaseWar;
