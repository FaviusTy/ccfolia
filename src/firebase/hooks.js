import { useEffect } from 'react'

import { db, auth } from './core'

export const useFirestore = (select, action, watches = []) => {
  useEffect(() => {
    const ref = select(db)
    return ref.onSnapshot((snapshot) => {
      if (snapshot.docs) {
        action(snapshot.docChanges())
      } else {
        action(snapshot.data())
      }
    })
  }, watches)
}

export const useAuth = (action) => {
  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      action(user)
    })
  }, [])
  return auth
}
