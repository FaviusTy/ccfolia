import { createCollectionStore } from '../modules/react-firebase-hooks'

const select = (id) => (db) => db.collection(`rooms/${id}/messages`)

const actions = (ref) => ({
  add: (item) => {
    item.timestamp = Date.now()
    ref.add(item)
  }
})

export const {
  useStore: useMessagesStore,
  useAction: useMessagesAction
} = createCollectionStore(select, actions)
