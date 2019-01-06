const MODULE_KEY = 'room:messages'

const initialState = () => {
  return {
    room: {
      messages: []
    }
  }
}

const observers = {
  [MODULE_KEY]: ({ commit, select, db, changesReduce }, rid) => {
    if (!rid) return
    return db.collection(`rooms/${rid}/messages`).orderBy('timestamp').onSnapshot((snapshot) => {
      const prev = select(MODULE_KEY)
      const messages = changesReduce(prev, snapshot.docChanges())
      commit(`${MODULE_KEY}:set`, messages)
    })
  }
}

const actions = {
  [`${MODULE_KEY}:add`]: ({ db }, rid, item) => {
    if (!rid) return
    const ref = db.collection(`rooms/${rid}/messages`)
    item.timestamp = Date.now()
    ref.add(item)
  },
  [`${MODULE_KEY}:clear`]: async ({ db, select }, rid) => {
    if (!rid) return
    const messages = select(MODULE_KEY)
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
  }
}

const mutations = {
  [`${MODULE_KEY}:set`]: (state, messages) => {
    state.room.messages = messages
  }
}

const getters = {
  [MODULE_KEY]: (state) => {
    return state.room.messages
  }
}

export default {
  initialState,
  observers,
  actions,
  mutations,
  getters
}
