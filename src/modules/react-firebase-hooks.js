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
  const useCollectionStore = (param) => {
    const [state, setState] = useState([])
    const ref = useMemo(() => {
      return selector(param)(db)
    }, [param])
    useEffect(() => {
      return ref.onSnapshot(({ docChanges }) => {
        setState((prevState) => {
          return changesReduce(prevState, docChanges)
        })
      })
    }, [ref])
    return [state, ref]
  }
  const useCollectionAction = (param) => {
    const ref = useMemo(() => {
      return selector(param)(db)
    }, [param])
    return actions(ref)
  }
  return { useCollectionStore, useCollectionAction }
}

export const createDocStore = (selector, actions) => {
  const useDocStore = (param) => {
    const [state, setState] = useState([])
    const ref = useMemo(() => {
      return selector(param)(db)
    }, [param])
    useEffect(() => {
      return ref.onSnapshot((doc) => {
        setState(doc.data())
      })
    }, [ref])
    return [state]
  }
  const useDocAction = (param) => {
    const ref = useMemo(() => {
      return selector(param)(db)
    }, [param])
    return actions(ref)
  }
  return { useDocStore, useDocAction }
}
