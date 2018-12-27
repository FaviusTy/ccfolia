import firebase from 'firebase/app'

import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

import { useEffect, useState, useMemo, useCallback } from 'react'
import config from '../config/firebase'

firebase.initializeApp(config)

const db = firebase.firestore()
// db.settings({ timestampsInSnapshots: true })

const storage = firebase.storage()

const updateHandler = (state, { type, doc }) => {
  if (type === 'removed') {
    return state.filter((item) => {
      return item.id !== doc.id
    })
  }
  if (type === 'modified') {
    return state.map((item) => {
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
    // mutable change (for performance)
    return state.push({ ...doc.data(), id: doc.id })
  }
}

export const useCollection = ({ select, sort }) => {
  const [state, setState] = useState([])
  const collection = useMemo(() => {
    return select(db)
  }, [])
  useEffect(() => {
    return collection.onSnapshot(({ docChanges }) => {
      setState((prevState) => {
        const nextState = [...prevState]
        docChanges.forEach((change) => {
          updateHandler(nextState, change)
        })
        return nextState
      })
    })
  }, [])
  return [state, collection]
}

export const useDocument = ({ select, initialState }) => {
  const [state, setState] = useState({ ...initialState })
  const doc = useMemo(() => {
    return select(db)
  }, [])
  useEffect(() => {
    return doc.onSnapshot((doc) => {
      setState(doc.data())
    })
  }, [])
  return [state, doc]
}

export const useStorageWithCollection = ({ select, sort, path }) => {
  const [state, setState] = useState([])
  const [collection, storageRef] = useMemo(() => {
    return [select(db), storage.ref(path)]
  })
  useEffect(() => {
    return collection.onSnapshot(({ docChanges }) => {
      const nextState = [...state]
      docChanges.forEach((change) => {
        updateHandler(nextState, change)
      })
      setState(sort ? sort(nextState) : nextState)
    })
  }, [])
  const add = async (file, metadata) => {
    try {
      const doc = await collection.add({
        uploaded: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
      const { ref } = await storageRef.child(doc.id).put(file)
      const metadata = await ref.updateMetadata(metadata)
      const downloadURL = await ref.getDownloadURL()
      doc.set({
        uploaded: true,
        downloadURL,
        contentType: metadata.contentType,
        size: metadata.size
      }, { merge: true })
    } catch (err) {
      console.error(err)
    }
  }
  const remove = async (id) => {
    try {
      await storageRef.child(id).delete()
    } catch(err) {
      console.error(err)
    }
    return collection.doc(id).delete()
  }
  return [state, { add, remove }]
}
