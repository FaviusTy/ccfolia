import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import { useEffect, useState, useMemo, useCallback } from 'react'
import config from '../config/firebase'

firebase.initializeApp(config)

const db = firebase.firestore()
const storage = firebase.storage()

const handlers = {
  doc: (name, doc, commit) => {
    commit(`$firestore.${name}.set`, doc.data())
  },
  collection: (name, { docChanges }, commit) => {
    docChanges.forEach(({ type, doc }) => {
      if (type === 'removed') {
        commit(`$firestore.${name}.remove`, doc.id)
      }
      if (type === 'modified') {
        commit(`$firestore.${name}.modified`, {
          ...doc.data(),
          id: doc.id
        })
      }
      if (type === 'added') {
        commit(`$firestore.${name}.added`, {
          ...doc.data(),
          id: doc.id
        })
      }
    })
  }
}

export const useFirestore = ({ name, type, select }, commit) => {
  const ref = useMemo(() => {
    return select(db)
  }, [])
  useEffect(() => {
    const handler = handlers[type]
    return ref.onSnapshot((snapshot) => handler(name, snapshot, commit))
  }, [])
  return ref
}

export const firestoreActions = {
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
