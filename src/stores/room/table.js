const name = 'room:table'

const initialState = () => {
  return {
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
  }
}

const observers = {
  [name]: ({ commit, db }, rid) => {
    if (!rid) return
    return db.doc(`rooms/${rid}/tables/default`).onSnapshot((doc) => {
      commit('room:table:set', doc.data())
    })
  }
}

const actions = {
  [`${name}:set`]: ({ db }, rid, item) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(item, { merge: true })
  },
  [`${name}:clear`]: ({ db }, rid) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(initialState().table)
  },
  [`${name}:obj:set`]: ({ db }, rid, item) => {
    if (!rid || !item.id) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set({ objects: { [item.id]: item } }, { merge: true })
  }
}

const mutations = {
  [`${name}:set`]: (state, table) => {
    Object.assign(state.room.table, table)
  }
}

const getters = {
  [name]: (state) => {
    return state.room.table
  }
}

export default {
  initialState,
  observers,
  actions,
  mutations,
  getters
}
