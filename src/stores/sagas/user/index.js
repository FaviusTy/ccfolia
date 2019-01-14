import { takeEvery, put, call, fork, select, all } from 'redux-saga/effects'
import { db, storage } from '../../../firebase/core'

const fileAdd = function* ({ file, tags = [] }) {
  const user = yield select((state) => state.user.auth)

  if (!user.uid || !file) return

  const storageRef = storage.ref(`users/${user.uid}/files`)
  const collectionRef = db.collection(`/users/${user.uid}/files`)

  const doc = yield call(() => collectionRef.add({
    name: file.name,
    uploaded: false,
    url: null,
    contentType: file.type,
    owner: user.uid,
    size: 0,
    tags,
    t: Date.now()
  }))

  const { ref } = yield call(() => storageRef.child(doc.id).put(file))
  const metadata = yield call(() => ref.updateMetadata({
    cacheControl: `public,max-age=${60 * 60 * 24 * 30}`, // 30days
  }))

  console.log(metadata)


  const downloadURL = yield call(() => ref.getDownloadURL())

  yield call(() => doc.set({
    uploaded: true,
    url: downloadURL,
    contentType: metadata.contentType,
    size: metadata.size
  }, { merge: true }))
}
const fileDelete = function* ({ id }) {
  const user = yield select((state) => state.user.auth)
  if (!user.uid) return

  const storageRef = storage.ref(`users/${user.uid}/files`)
  const collectionRef = db.collection(`/users/${user.uid}/files`)

  yield call(() => storageRef.child(id).delete())
  yield call(() => collectionRef.doc('files').delete())
}
const fileDeleteAll = function* () {
  const user = yield select((state) => state.user.auth)
  const files = yield select((state) => state.user.files)

  if (!user.uid) return

  const storageRef = storage.ref(`users/${user.uid}/files`)
  const collectionRef = db.collection(`/users/${user.uid}/files`)

  yield all(files.map(({ id }) => {
    return storageRef.child(id).delete().catch(() => null)
  }))

  const targets = [...files]
  while (targets.length > 0) {
    const t = targets.splice(-500)
    const batch = db.batch()
    t.forEach(({ id }) => {
      batch.delete(collectionRef.doc(id))
    })
    batch.commit()
  }
}

// watcher
const userSaga = function* () {
  yield takeEvery('@FILE_ADD', fileAdd)
  yield takeEvery('@FILE_DELETE', fileDelete)
  yield takeEvery('@FILE_DELETE_ALL', fileDeleteAll)
}

export default userSaga