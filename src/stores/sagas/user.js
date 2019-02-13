import {
  takeEvery,
  takeLatest,
  select,
  fork,
  call,
  put,
  all
} from "redux-saga/effects";
import { push } from "connected-react-router";
import { auth, providers } from "../../firebase/core";
import { createStoreSaga, authSaga } from "../../firebase/saga";
import { db, storage } from "../../firebase/core";

const signInWithTwitter = function*() {
  yield call(() => auth.signInWithPopup(providers.twitter));
  yield put(push("/home"));
};

const signInGuest = function*() {
  yield call(() => auth.signInAnonymously());
  yield put(push("/home"));
};

const listenRoomsChannel = function*({ user }) {
  if (user.uid) {
    const roomsStoreSaga = createStoreSaga(
      db => db.collection("rooms").where("owner", "==", user.uid),
      "USER_ROOM_CHANGES"
    );
    yield call(roomsStoreSaga);
  }
};

const addRoom = function*() {
  const uid = yield select(state => state.user.uid);
  if (uid) {
    const collection = db.collection("rooms");
    yield call(() => collection.add({ owner: uid, t: Date.now() }));
  }
};

const deleteRoom = function*({ id }) {
  const doc = db.collection("rooms").doc(id);
  yield call(() => doc.delete());
};

// const listenCharactersChannel = function*({ user }) {
//   if (user.uid) {
//     const roomsStoreSaga = createStoreSaga(
//       db => db.collection("characters").where("owner", "==", user.uid),
//       "USER_CHARACTER_CHANGES"
//     );
//     yield call(roomsStoreSaga);
//   }
// };

// const setCharacter = function*({ id, character }) {
//   const uid = yield select(state => state.user.uid);
//   if (uid) {
//     const doc = db.collection("characters").doc(id);
//     yield call(() =>
//       doc.set({
//         ...character,
//         owner: uid
//       })
//     );
//   }
// };

// const deleteCharacter = function*({ id }) {
//   const doc = db.collection("characters").doc(id);
//   yield call(() => doc.delete());
// };

export const fileAdd = function*({ file, tags = [] }) {
  const user = yield select(state => state.user);
  const id = yield select(state => state.room.id);
  const directory = `rooms/${id}`;

  if (!user.uid || !file || !directory) return;

  const storageRef = storage.ref(`users/${user.uid}/files`);
  const collectionRef = db.collection(`users/${user.uid}/files`);

  yield collectionRef.add({
    t: Date.now()
  });

  const doc = yield call(() =>
    collectionRef.add({
      name: file.name,
      uploaded: false,
      url: null,
      contentType: file.type,
      owner: user.uid,
      size: 0,
      directory,
      tags,
      t: Date.now()
    })
  );

  const { ref } = yield call(() => storageRef.child(doc.id).put(file));
  const metadata = yield call(() =>
    ref.updateMetadata({
      cacheControl: `public,max-age=${60 * 60 * 24 * 30}` // 30days
    })
  );

  const downloadURL = yield call(() => ref.getDownloadURL());

  yield call(() =>
    doc.set(
      {
        uploaded: true,
        url: downloadURL,
        contentType: metadata.contentType,
        size: metadata.size
      },
      { merge: true }
    )
  );
};

// files
const fileDelete = function*({ id }) {
  const user = yield select(state => state.user);
  if (!user.uid) return;

  const storageRef = storage.ref(`users/${user.uid}/files`);
  const collectionRef = db.collection(`users/${user.uid}/files`);

  yield call(() => storageRef.child(id).delete());
  yield call(() => collectionRef.doc(id).delete());
};

const fileDeleteAll = function*() {
  const user = yield select(state => state.user);
  const files = yield select(state => state.user.files);

  if (!user.uid) return;

  const storageRef = storage.ref(`users/${user.uid}/files`);
  const collectionRef = db.collection(`users/${user.uid}/files`);

  yield all(
    files.map(({ id }) => {
      return storageRef
        .child(id)
        .delete()
        .catch(() => null);
    })
  );

  const targets = [...files];
  while (targets.length > 0) {
    const t = targets.splice(-500);
    const batch = db.batch();
    t.forEach(({ id }) => {
      batch.delete(collectionRef.doc(id));
    });
    batch.commit();
  }
};

const userInit = function*({ user }) {
  yield put({ type: "SIGN_IN", user });
  yield fork(listenRoomsChannel, { user });
  // yield fork(listenFilesChannel, { user });
  // yield fork(listenCharactersChannel, { user });
  // TODO: room init
};

const userSaga = function*() {
  yield takeLatest("@SIGN_IN_WITH_TWITTER", signInWithTwitter);
  yield takeLatest("@SIGN_IN_GUEST", signInGuest);

  yield takeLatest("@SIGN_IN", userInit);

  yield takeEvery("@ROOM_ADD", addRoom);
  yield takeEvery("@ROOM_DELETE", deleteRoom);
  // yield takeEvery("@CHARACTER_SET", setCharacter);
  // yield takeEvery("@CHARACTER_DELETE", deleteCharacter);

  yield takeEvery("@FILE_ADD", fileAdd);
  yield takeEvery("@FILE_DELETE", fileDelete);
  yield takeEvery("@FILE_DELETE_ALL", fileDeleteAll);
  yield fork(authSaga);
};

export default userSaga;
