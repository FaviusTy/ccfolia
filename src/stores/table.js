import { createDocStore } from '../modules/react-firebase-hooks'

const select = ({ rid, id }) => (db) => db.doc(`rooms/${rid}/tables/${id}`)

const actions = (ref) => ({
  update: (item) => {
    ref.set(item, { merge: true })
  }
})

export const {
  useStore: useTableStore,
  useAction: useTableAction
} = createDocStore(select, actions, {
  objects: [],
  background: { url: '/bg.jpg' },
  // background: { url: '' },
  media: {
    // url: 'https://www.youtube.com/watch?v=WSUFzC6_fp8',
    url: '',
    loop: true,
    muted: true,
    volume: 0.1
  }
})