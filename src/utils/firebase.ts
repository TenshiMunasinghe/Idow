import * as firebase from 'firebase-admin'

export type TimeStamp = firebase.firestore.Timestamp

firebase.initializeApp({
  credential: firebase.credential.cert(
    process.env.NODE_ENV === 'development'
      ? require('../../config/firebase.json')
      : JSON.parse(
          Buffer.from(
            process.env.FIREBASE_CONFIG_BASE64 || '',
            'base64'
          ).toString('ascii')
        )
  ),
})

export const db = firebase.firestore()

export const toTimeStamp = (date: Date) =>
  firebase.firestore.Timestamp.fromDate(date)
