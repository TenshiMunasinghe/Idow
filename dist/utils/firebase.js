"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.toTimeStamp = exports.db = void 0;
var firebase = __importStar(require("firebase-admin"));
var serviceAccount = require('../../config/firebase.json');
firebase.initializeApp({
    credential: firebase.credential.cert(process.env.NODE_ENV === 'production'
        ? JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG_BASE64 || '', 'base64').toString('ascii'))
        : serviceAccount),
});
exports.db = firebase.firestore();
var toTimeStamp = function (date) {
    return firebase.firestore.Timestamp.fromDate(date);
};
exports.toTimeStamp = toTimeStamp;
