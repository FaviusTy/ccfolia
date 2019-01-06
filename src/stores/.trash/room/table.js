const MODULE_KEY = 'room:table'

const initialState = () => {
  return {
    room: {
      tableEdit: {
        obj: null
      },
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
          col: 16,
          row: 9,
          grid: 0,
          rotate: false
        },
        objects: {},
      }
    }
  }
}

const observers = {
  [MODULE_KEY]: ({ commit, db }, rid) => {
    if (!rid) return
    return db.doc(`rooms/${rid}/tables/default`).onSnapshot((doc) => {
      commit('room:table:set', doc.data())
    })
  }
}

const actions = {
  [`${MODULE_KEY}:set`]: ({ db }, rid, item) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(item, { merge: true })
  },
  [`${MODULE_KEY}:clear`]: ({ db }, rid) => {
    if (!rid) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(initialState().room.table)
  },
  // todo: use collection
  [`${MODULE_KEY}:obj:set`]: ({ db }, rid, item) => {
    if (!rid || !item.id) return
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set({ objects: { [item.id]: item } }, { merge: true })
  },
  [`${MODULE_KEY}:obj:delete`]: ({ db, select }, rid, item) => {
    if (!rid || !item.id) return
    const table = select(MODULE_KEY)
    const nextObjects = { ...table.objects }
    delete nextObjects[item.id]
    const nextTable = {
      ...table,
      objects: nextObjects
    }
    const ref = db.doc(`rooms/${rid}/tables/default`)
    ref.set(nextTable)
  }
}

const mutations = {
  [`${MODULE_KEY}:set`]: (state, table) => {
    state.room.table = {
      ...state.room.table,
      ...table
    }
  },
  [`${MODULE_KEY}:obj:edit`]: (state, id) => {
    state.room.tableEdit = {
      ...state.room.tableEdit,
      obj: id
    }
  },
  [`${MODULE_KEY}:field:edit`]: (state, id) => {
    state.room.table.tableEdit = {
      ...state.room.table.tableEdit,
      field: id
    }
  }
}

const getters = {
  [MODULE_KEY]: (state) => {
    return state.room.table
  },
  [`${MODULE_KEY}:field`]: (state) => {
    return state.room.table.field
  },
  [`${MODULE_KEY}:objects`]: (state) => {
    // todo: memolize
    return Object.keys(state.room.table.objects).map((key) => {
      return state.room.table.objects[key]
    })
  },
  [`${MODULE_KEY}:obj:find`]: (state, id) => {
    // todo: memolize
    console.log(state.room.table.objects, id)

    return state.room.table.objects[id]
  },
  [`${MODULE_KEY}:edit`]: (state) => {
    return state.room.tableEdit
  },
}

export default {
  initialState,
  observers,
  actions,
  mutations,
  getters
}
