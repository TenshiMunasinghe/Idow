import * as firebase from 'firebase-admin'

const serviceAccount = require('../../config/firebase.json')

export type TimeStamp = firebase.firestore.Timestamp

firebase.initializeApp({
  credential: firebase.credential.cert(
    process.env.NODE_ENV === 'production'
      ? JSON.parse(
          Buffer.from(
            process.env.FIREBASE_CONFIG_BASE64 || '',
            'base64'
          ).toString('ascii')
        )
      : serviceAccount
  ),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
