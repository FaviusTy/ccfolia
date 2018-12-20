import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/auth'
import 'firebase/storage'

import { useEffect, useState, useMemo, useCallback } from 'react'
import config from '../config/firebase'

firebase.initializeApp(config)

const db = firebase.firestore()
const storage = firebase.storage()

// Common Functions
const changesReduce = (state, changes) => {
  return changes.reduce((currentState, { type, doc }) => {
    if (type === 'removed') {
      return currentState.filter((item) => {
        return item.id !== doc.id
      })
    }
    if (type === 'modified') {
      return currentState.map((item) => {
        if (item.id === doc.id) {
          return {　...doc.data(),　id: doc.id　}
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

// Export Functions
export const createCollectionStore = (selector, actions) => {
  const useStore = (...params) => {
    const [state, setState] = useState([])
    const ref = useMemo(() => {
      return selector(...params)(db)
    }, [...params])
    useEffect(() => {
      return ref.onSnapshot(({ docChanges }) => {
        setState((prevState) => {
          return changesReduce(prevState, docChanges)
        })
      })
    }, [ref])
    return [state, ref]
  }
  const useAction = (...params) => {
    const ref = useMemo(() => {
      return selector(...params)(db)
    }, [...params])
    return actions(ref)
  }
  return { useStore, useAction }
}

export const createDocStore = (selector, actions, initialState) => {
  const useStore = (...params) => {
    const [state, setState] = useState(initialState)
    const ref = useMemo(() => {
      return selector(...params)(db)
    }, [...params])

    useEffect(() => {
      return ref.onSnapshot((doc) => {
        setState((prevState) => {
          return {
            ...prevState,
            ...doc.data()
          }
        })
      })
    }, [ref])
    return [state]
  }
  const useAction = (...params) => {
    const ref = useMemo(() => {
      return selector(...params)(db)
    }, [...params])
    return actions(ref)
  }
  return { useStore, useAction }
}
