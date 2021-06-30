import * as firebase from 'firebase-admin'

const serviceAccount = require('../../config/firebase-test.json')

export type TimeStamp = firebase.firestore.Timestamp

const environment =
  process.env.NODE_ENV === 'production' ? 'production' : 'test'

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount[environment]),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
