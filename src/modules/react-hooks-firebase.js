import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/auth'
import 'firebase/storage'

import { useEffect, useState, useMemo, useCallback } from 'react'
import config from '../config/firebase'

firebase.initializeApp(config)

const db = firebase.firestore()
const storage = firebase.storage()

const changesReducer = (state, changes) => {
  return changes.reduce((currentState, { type, doc }) => {
    if (type === 'removed') {
      return currentState.filter((item) => {
        return item.id !== doc.id
      })
    }
    if (type === 'modified') {
      return currentState.map((item) => {
        if (item.id === doc.id) {
          return {
            ...doc.data(),
            id: doc.id
          }
        } else {
          return item
        }
      })
    }
    if (type === 'added') {
      return [...currentState, { ...doc.data(), id: doc.id }]
    }
  }, state)
}

export const useFirestore = ({ select }) => {
  const [state, setState] = useState([])
  const ref = useMemo(() => {
    return select(db)
  }, [select])
  useEffect(() => {
    return ref.onSnapshot(({ docChanges }) => {
      setState((prevState) => {
        return changesReducer(prevState, docChanges)
      })
    })
  }, [])
  return [state, ref]
}

export const firestoreMutations = {
  collection: (name) => ({
    [`$firestore.${name}.removed`]: (state, id) => {
      state[name] = state[name].filter((item) => item.id !== id)
    },
    [`$firestore.${name}.modified`]: (state, newItem) => {
      state[name] = state[name].map((item) => {
        if (item.id === newItem.id) {
          return newItem
        } else {
          return item
        }
      })
    },
    [`$firestore.${name}.added`]: (state, item) => {
      state[name].push(item)
    }
  }),
  doc: (name) => ({
    [`$firestore.${name}.set`]: (state, item) => {
      Object.assign(state, item)
    }
  })
}
