import { fork } from 'redux-saga/effects'
import fileSaga from './file'

// watcher
const userSaga = function* () {
  yield fork(fileSaga)
}

export default userSaga