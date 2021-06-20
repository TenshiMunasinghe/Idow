import * as firebase from 'firebase-admin'

export const formatWar = (
  war: firebase.firestore.DocumentData,
  id: string
) => ({
  ...war,
  spin_time: war.spin_time.toDate(),
  id,
})
