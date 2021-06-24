import * as firebase from 'firebase-admin'

const serviceAccount = require('../../config/firebase-test.json')

export type TimeStamp = firebase.firestore.Timestamp

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
