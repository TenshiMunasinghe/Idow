import * as firebase from 'firebase-admin'

export type TimeStamp = firebase.firestore.Timestamp

console.log('NODE ENV', process.env.NODE_ENV)

firebase.initializeApp({
  credential: firebase.credential.cert(
    process.env.NODE_ENV === 'production'
      ? JSON.parse(
          Buffer.from(
            process.env.FIREBASE_CONFIG_BASE64 || '',
            'base64'
          ).toString('ascii')
        )
      : require('../../config/firebase.json')
  ),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
