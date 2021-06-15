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
var serviceAccount = require('../config/firebase.json');
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});
firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
});
var db = firebase.firestore();
