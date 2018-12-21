import { createCollectionStore } from '../modules/react-firebase-hooks'

const select = (aid) => (db) => db.collection(`assets/${aid}/effects`)

const actions = (ref) => ({
  add: (item) => {
    ref.add(item)
  },
  set: (id, item) => {
    ref.doc(id).set(item, { merge: true })
  },
  remove: (id) => {
    ref.doc(id).delete()
  }
})

export const {
  useStore: useEffectsStore,
  useAction: useEffectsAction
} = createCollectionStore(select, actions)
