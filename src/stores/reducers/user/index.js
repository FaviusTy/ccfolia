import { combineReducers } from 'redux'
import { createReducer } from '../../../modules/redux-utils'
import { collectionReducer } from '../../../firebase/reducer'

const initialAuthState = {
  initialized: false,
  displayName: null,
  uid: null,
  isGuest: null
}
const authReducer = createReducer(initialAuthState, {
  USER_INIT: (state, { user }) => {
    if (user) { // login
      return {
        ...state,
        displayName: user.displayName,
        uid: user.uid,
        isGuest: user.isAnonymous,
        initialized: true
      }
    } else { // logout
      return {
        ...initialAuthState,
        initialized: true
      }
    }
  }
})

const filesReducer = createReducer([], {
  USER_INIT: (state, { user }) => {
    if (user) { // login
      return state
    } else { // logout
      return []
    }
  },
  FILE_CHANGES: collectionReducer
})

export default combineReducers({
  auth: authReducer,
  files: filesReducer
})