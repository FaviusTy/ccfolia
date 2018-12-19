import { createStore } from 'redux'
import { createReactReduxHooks } from '../modules/react-redux-hooks'

function reducer(state = 0, action) {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}

const actions = (dispatch) => ({
  increment: (item) => {
    dispatch({ type: 'INCREMENT' })
  }
})

export const store = createStore(reducer)
export const { useStore, useAction } = createReactReduxHooks(store, actions)

// export const { useStore, useAction } = createReactFirebaseHooks((db, id) => db.collection(`rooms/${id}/messages`), actions)

// const fs = (ref) => ({
//   add: (item) => {
//     ref.add(item)
//   },
//   remove: (id) => {
//   },
// })
