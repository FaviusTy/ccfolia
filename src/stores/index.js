import { createReactReduxHooks, mutationsToReducer } from '../modules/react-redux-hooks'
import { auth, db, storage, changesReduce } from '../modules/react-firebase-hooks'

const getInitialState = () => ({
  user: {
    images: []
  },
  room: {
    input: '',
    popup: null,
    table: {
      background: { url: '' },
      media: {
        url: '',
        loop: true,
        muted: true,
        volume: 0.1
      },
      field: {
        url: '',
        baseSize: 60,
        col: 15,
        row: 12,
        grid: true,
        rotate: false
      },
      objects: {},
    },
    messages: []
  }
})

const reducer = mutationsToReducer({
  'room:init': (state) => {
    state.room = getInitialState().room
  },
  'table:set': (state, table) => {
    Object.assign(state.room.table, table)
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
  'room:in': (state, id) => {
    state.room = getInitialState().room
  },
  'room:in': (state, name) => {
    state.room.popup = name
  },
  'messages:set': (state, messages) => {
    state.room.messages = messages
  },
  'images:set': (state, images) => {
    state.user.images = images
  }
})

const actions = {
  'messages:add': (_, rid, item) => {
    if (!rid) return
    const ref = db.collection(`rooms/${rid}/messages`)
    item.timestamp = Date.now()
    ref.add(item)
  },
  'messages:clear': async ({ select }, rid, item) => {
    if (!rid) return
    const messages = select('messages')
    const targets = [...messages]
    const ref = db.collection(`rooms/${rid}/messages`)
    while (targets.length > 0) {
      const t = targets.splice(-500)
      const batch = db.batch()
      t.forEach(({ id }) => {
        batch.delete(ref.doc(id))
      })
      await batch.commit()
    }
  },
  'table:set': (_, rid, item) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(item, { merge: true })
  },
  'table:clear': (_, rid) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(getInitialState().table)
  },
  'table:obj:set': (_, rid, item) => {
    if (!rid || !item.id) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set({ objects: { [item.id]: item } }, { merge: true })
  },
  'images:add': async (_, { uid, oid }, file) => {
    if (!uid || !oid || !file) return
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
    } catch(err) {
      alert(err.toString())
    }
  }
}

const getters = {
  'user': (state) => {
    return state.user
  },
  'messages': (state) => {
    return state.room.messages
  },
  'table': (state) => {
    return state.room.table
  },
  'images': (state) => {
    return state.user.images
  }
}

const observers = {
  'user': ({ commit }) => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        commit('user:set', user)
      } else {
        commit('user:reset')
      }
    })
  },
  'messages': ({ commit, select }, rid) => {
    if (!rid) return
    return db.collection(`rooms/${rid}/messages`).onSnapshot((snapshot) => {
      const prev = select('messages')
      const messages = changesReduce(prev, snapshot.docChanges())
      commit('messages:set', messages)
    })
  },
  'table': ({ commit }, rid) => {
    if (!rid) return
    return db.doc(`rooms/${rid}/tables/default`).onSnapshot((doc) => {
      commit('table:set', doc.data())
    })
  },
  'images': ({ commit, select }, uid) => {
    if (!uid) return
    return db.collection('images').where('owner', '==', uid).onSnapshot((snapshot) => {
      const prev = select('images')
      const images = changesReduce(prev, snapshot.docChanges())
      commit('images:set', images)
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
  initialState:
  getInitialState()
})
