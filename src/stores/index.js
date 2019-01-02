import { createReactReduxHooks, mutationsToReducer } from '../modules/react-redux-hooks'
import { auth, db, storage, changesReduce } from '../modules/react-firebase-hooks'

import messages from './room/messages'
import table from './room/table'

const getInitialState = () => ({
  user: {
    images: [],
    objects: []
  },
  room: {
    input: '',
    popup: null,
    table: table.initialState(),
    messages: messages.initialState()
  }
})

const reducer = mutationsToReducer({
  ...messages.mutations,
  ...table.mutations,
  'room:init': (state) => {
    state.room = getInitialState().room
  },
  'user:set': (state, user) => {
    Object.assign(state.user, {
      displayName: user.displayName,
      uid: user.uid,
      isGuest: user.isAnonymous
    })
  },
  'user:reset': (state, user) => {
    state.user = getInitialState().user
  },
  'images:set': (state, images) => {
    state.user.images = images
  },
  'objects:set': (state, objects) => {
    state.user.objects = objects
  }
})

const actions = {
  ...messages.actions,
  ...table.actions,
  'images:add': async ({ db }, uid, file) => {
    if (!uid || !file) return
    const DEFAULT_CACHE_CONTROL = `public,max-age=${60 * 60 * 24 * 14}`
    const ref = db.collection('images')
    try {
      const doc = await ref.add({
        owner: uid,
        status: 'created',
        url: '',
        contentType: '',
        size: 0,
        t: Date.now(),
        order: -1
      })
      const storageRef = storage.ref('images').child(doc.id)
      const snapshot = await storageRef.put(file)
      const [url, metadata] = await Promise.all([
        snapshot.ref.getDownloadURL(),
        snapshot.ref.updateMetadata({ cacheControl: DEFAULT_CACHE_CONTROL })
      ])
      await doc.set({
        status: 'uploaded',
        contentType: metadata.contentType,
        size: metadata.size,
        url,
      }, { merge: true })
      return url
    } catch(err) {
      alert(err.toString())
      return
    }
  },
  'assets:objects:add': ({ db }, uid, item) => {
    if (!uid) return
    const ref = db.collection(`assets/${uid}/objects`)
    return ref.add(item)
  },
  'assets:objects:set': ({ db }, uid, item) => {
    if (!uid) return
    const ref = db.collection(`assets/${uid}/objects`)
    return ref.set(item, { merge: true })
  },
  'assets:objects:clear': async ({ db, select }, uid) => {
    if (!uid) return
    const objects = select('objects')
    const ref = db.collection(`assets/${uid}/objects`)
    const targets = [...objects]
    while (targets.length > 0) {
      const t = targets.splice(-500)
      const batch = db.batch()
      t.forEach(({ id }) => {
        batch.delete(ref.doc(id))
      })
      await batch.commit()
    }
  }
}

const getters = {
  ...messages.getters,
  ...table.getters,
  'user': (state) => {
    return state.user
  },
  'table': (state) => {
    return state.room.table
  },
  'images': (state) => {
    return state.user.images
  },
  'objects': (state) => {
    return state.user.objects
  }
}

const observers = {
  ...messages.observers,
  ...table.observers,
  'user': ({ commit }) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        commit('user:set', user)
      } else {
        commit('user:reset')
      }
    })
  },
  'images': ({ commit, select }, uid) => {
    if (!uid) return
    return db.collection('images').where('owner', '==', uid).onSnapshot((snapshot) => {
      const prev = select('images')
      const images = changesReduce(prev, snapshot.docChanges())
      commit('images:set', images)
    })
  },
  'objects': ({ commit, select }, uid) => {
    if (!uid) return
    return db.collection(`assets/${uid}/objects`).onSnapshot((snapshot) => {
      const prev = select('objects')
      const objects = changesReduce(prev, snapshot.docChanges())
      commit('objects:set', objects)
    })
  }
}

export const {
  useDispatcher,
  useObserver,
  useGetter
} = createReactReduxHooks({
  reducer,
  actions,
  observers,
  getters,
  context: { db, storage, auth, changesReduce },
  initialState: getInitialState()
})
