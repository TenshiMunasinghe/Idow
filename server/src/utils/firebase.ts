import * as firebase from 'firebase-admin'

const serviceAccount = require('../../config/firebase.json')

firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
