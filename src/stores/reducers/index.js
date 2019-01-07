import { combineReducers } from 'redux'

import roomReducer from './room'
import userReducer from './user'

const rootReducer = combineReducers({
  room: roomReducer,
  user: userReducer
})

export default rootReducer