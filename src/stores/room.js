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
export const {
  useStore: useRoomStore,
  useAction: useRoomAction
} = createReactReduxHooks(store, actions)
