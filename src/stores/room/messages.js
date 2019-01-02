const name = 'room:messages'

const initialState = () => {
  return []
}

const observers = {
  [name]: ({ commit, select, db, changesReduce }, rid) => {
    if (!rid) return
    return db.collection(`rooms/${rid}/messages`).onSnapshot((snapshot) => {
      const prev = select(name)
      const messages = changesReduce(prev, snapshot.docChanges())
      commit(`${name}:set`, messages)
    })
  }
}

const actions = {
  [`${name}:add`]: ({ db }, rid, item) => {
    if (!rid) return
    const ref = db.collection(`rooms/${rid}/messages`)
    item.timestamp = Date.now()
    ref.add(item)
  },
  [`${name}:clear`]: async ({ db, select }, rid, item) => {
    if (!rid) return
    const messages = select(name)
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
  [`${name}:set`]: (state, messages) => {
    state.room.messages = messages
  }
}

const getters = {
  [name]: (state) => {
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
