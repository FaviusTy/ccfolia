import { createCollectionStore } from '../modules/react-firebase-hooks'

const select = (id) => (db) => db.collection(`rooms/${id}/messages`)

const actions = (ref, db) => ({
  add: (item) => {
    item.timestamp = Date.now()
    ref.add(item)
  },
  deleteAll: async (messages) => {
    const targets = [...messages]
    while (targets.length > 0) {
      const t = targets.splice(-500)
      const batch = db.batch()
      t.forEach(({ id }) => {
        batch.delete(ref.doc(id))
      })
      await batch.commit()
    }
  }
})

export const {
  useStore: useMessagesStore,
  useAction: useMessagesAction
} = createCollectionStore(select, actions)
