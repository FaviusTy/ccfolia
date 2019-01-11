import { takeEvery, put, call, select } from 'redux-saga/effects'
import { db } from '../../../firebase/core'

// selector
const selectRoomId = (state) => state.room.id
const selectUserId = (state) => state.user.auth.uid

// messages
const messageAdd = function* ({ item }) {
  const roomId = yield select(selectRoomId)
  const owner = yield select(selectUserId)
  const t = Date.now()
  if (!roomId) return
  yield call(() => db.collection(`/rooms/${roomId}/messages`).add({
    ...item,
    owner,
    t
  }))
}

const messageDeleteAll = function* ({ items }) {
  const roomId = yield select(selectRoomId)
  if (!roomId) return
  // todo
}

// obj
const objAdd = function* ({ item }) {
  const roomId = yield select(selectRoomId)
  if (!roomId) return
  yield put({
    type: 'FORM_SET',
    key: 'object',
    item: {
      ...item,
      id: Date.now().toString(34)
    }
  })
}
const objSet = function* ({ id, item }) {
  const roomId = yield select(selectRoomId)
  console.log(!roomId)

  if (!roomId || !id) return
  yield call(() => db.collection(`/rooms/${roomId}/objects`).doc(id).set(item, { merge: true }))
}
const objDelete = function* ({ id }) {
  const roomId = yield select(selectRoomId)
  if (!roomId || !id) return
  yield put({ type: 'FORM_SET', key: 'object', item: null })
  yield call(() => db.collection(`/rooms/${roomId}/objects`).doc(id).delete())
}

// table
const tableSet = function* ({ item }) {
  const roomId = yield select(selectRoomId)
  if (!roomId) return
  yield call(() => db.collection(`/rooms/${roomId}/tables`).doc('default').set(item, { merge: true }))
}

// watcher
const roomSaga = function* () {
  yield takeEvery('*', console.log)
  yield takeEvery('@MESSAGE_ADD', messageAdd)
  yield takeEvery('@MESSAGE_DELETE_ALL', messageDeleteAll)
  yield takeEvery('@OBJECT_ADD', objAdd)
  yield takeEvery('@OBJECT_SET', objSet)
  yield takeEvery('@OBJECT_DELETE', objDelete)
  yield takeEvery('@TABLE_SET', tableSet)
}

export default roomSaga