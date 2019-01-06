import { fork } from 'redux-saga/effects'

import roomSaga from './room'

const rootSaga = function* () {
  yield fork(roomSaga)
}

export default rootSaga