import * as firebase from 'firebase-admin'

const serviceAccount = require('../config/firebase.json')
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})
firebase.initializeApp({
  credential: firebase.credential.cert(serviceAccount),
})

const db = firebase.firestore()
