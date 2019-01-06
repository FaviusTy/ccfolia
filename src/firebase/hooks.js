import { useEffect } from 'react'

import { db } from './core'

// Common Functions
export const useFirestore = (select, action) => {
  useEffect(() => {
    const ref = select(db)
    return ref.onSnapshot((snapshot) => {
      if (snapshot.docs) {
        action(snapshot.docChanges())
      } else {
        action(snapshot.data())
      }
    })
  }, [])
}

export const useAuth = (action) => {
  useEffect(() => {
  }, [])
}