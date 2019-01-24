import { take, fork } from 'redux-saga/effects'

import roomSaga from './room'
import userSaga from './user'

const rootSaga = function* () {
  yield fork(roomSaga)
  yield fork(userSaga)
}

export default rootSaga