import firebase from 'firebase/app'
import 'firebase/firestore'
// import 'firebase/auth'
import 'firebase/storage'

import { useEffect, useState, useMemo, useCallback } from 'react'
import config from '../config/firebase'

firebase.initializeApp(config)

const db = firebase.firestore()
// const storage = firebase.storage()

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

const whereRef = (ref, params) => params ? ref.where(...params) : ref
const orderByRef = (ref, params) => params ? ref.orderBy(...params) : ref
const limitRef = (ref, limit) => limit ? ref.limit(limit) : ref

// Export Functions
export const createCollectionStore = (select, actions) => {
  const useStore = ({ params, where, order, limit }) => {
    const [state, setState] = useState([])
    const ref = useMemo(() => {
      return select(...params)(db)
    }, [...params])
    useEffect(() => {
      const queryRef = limitRef(orderByRef(whereRef(ref, where), order), limit)
      return queryRef.onSnapshot(({ docChanges }) => {
        setState((prevState) => {
          return changesReduce(prevState, docChanges)
        })
      })
    }, [ref])
    const _actions = useMemo(() => {
      return actions(ref)
    }, [ref])
    return [state, _actions]
  }
  const useAction = ({ params }) => {
    const ref = useMemo(() => {
      return select(...params)(db)
    }, [...params])
    const _actions = useMemo(() => {
      return actions(ref)
    }, [ref])
    return _actions
  }
  return { useStore, useAction }
}

export const createDocStore = (select, actions, initialState) => {
  const useStore = ({ params }) => {
    const [state, setState] = useState(initialState)
    const ref = useMemo(() => {
      return select(...params)(db)
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
    const _actions = useMemo(() => {
      return actions(ref)
    }, [ref])
    return [state, _actions]
  }
  const useAction = ({ params }) => {
    const ref = useMemo(() => {
      return select(...params)(db)
    }, [...params])
    const _actions = useMemo(() => {
      return actions(ref)
    }, [ref])
    return _actions
  }
  return { useStore, useAction }
}
