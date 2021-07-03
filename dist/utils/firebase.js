"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase = __importStar(require("firebase-admin"));
firebase.initializeApp({
    credential: firebase.credential.cert(process.env.NODE_ENV === 'development'
        ? require('../../config/firebase.json')
        : JSON.parse(Buffer.from(process.env.FIREBASE_CONFIG_BASE64 || '', 'base64').toString('ascii'))),
});
exports.db = firebase.firestore();
exports.toTimeStamp = function (date) {
    return firebase.firestore.Timestamp.fromDate(date);
};
