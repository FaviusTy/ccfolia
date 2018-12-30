import { createDocStore } from '../modules/react-firebase-hooks'

const initialState = {
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
  objects: {}
}

const select = (rid, id) => (db) => db.doc(`rooms/${rid}/tables/${id}`)

const actions = (ref) => ({
  set: (item) => {
    return ref.set(item, { merge: true })
  },
  reset: () => {
    return ref.set(initialState)
  },
  setObj: (item) => {
    if (item.id) {
      return ref.set({ objects: { [item.id]: item } }, { merge: true })
    } else {
      return false
    }
  }
})

export const {
  useStore: useTableStore,
  useAction: useTableAction
} = createDocStore(select, actions, initialState)