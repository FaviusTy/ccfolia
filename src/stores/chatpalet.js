import { createDocStore } from '../modules/react-firebase-hooks'

const select = (uid, id) => (db) => db.doc(`users/${uid}/chatpalets/${id}`)

const actions = (ref) => ({
  update: (item) => {
    // ref.set(item, { merge: true })
  }
})

const initialState = {
  items: [{
    name: 'TEST',
    texts: `abc
def
ghi
jkl
mno
pqr
stu`
  }, {
      name: 'TEST2',
      texts: `ABCDEFG`
  }]
}

export const {
  useStore: useChatPaletStore,
  useAction: useChatPaletAction
} = createDocStore(select, actions, initialState)
