import { createStore } from 'redux'
import { createReactReduxHooks } from '../modules/react-redux-hooks'

const initialState = {}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INIT':
      return initialState
    default:
      return state
  }
}

const actions = ({ dispatch }) => ({
  increment: (item) => {
    dispatch({ type: 'INCREMENT' })
  }
})

export const store = createStore(reducer)
export const {
  useStore: useRoomStore,
  useAction: useRoomAction
} = createReactReduxHooks(store, actions)
