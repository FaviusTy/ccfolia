import {
  select,
  call,
  put,
  fork,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import { db } from "../../firebase/core";
import { createStoreSaga } from "../../firebase/saga";

// Messages
const listenMessagesChannel = function*({ id }) {
  const storeSaga = createStoreSaga(
    db => db.collection(`rooms/${id}/messages`),
    "ROOM_MESSAGE_CHANGES"
  );
  yield call(storeSaga);
};

const messageAdd = function*({ message }) {
  const uid = yield select(state => state.user.uid);
  const id = yield select(state => state.room.id);
  if (uid) {
    yield call(() =>
      db.collection(`rooms/${id}/messages`).add({
        ...message,
        owner: uid
      })
    );
  }
};

const messageResetAll = function*() {
  const id = yield select(state => state.room.id);
  const messages = yield select(state => state.room.messages);
  const targets = [...messages];
  const ref = db.collection(`rooms/${id}/messages`);
  while (targets.length > 0) {
    const t = targets.splice(-500);
    const batch = db.batch();
    t.forEach(({ id }) => {
      batch.delete(ref.doc(id));
    });
    yield call(() => batch.commit());
  }
};

// Tracks
const listenTracksChannel = function*({ id }) {
  const storeSaga = createStoreSaga(
    db => db.collection(`rooms/${id}/tracks`),
    "ROOM_TRACK_CHANGES"
  );
  yield call(storeSaga);
};

const setTrack = function*({ itemId, track }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/tracks`)
      .doc(itemId)
      .set({
        ...track,
        t: Date.now()
      })
  );
};

// Objects
const listenObjectsChannel = function*({ id }) {
  const storeSaga = createStoreSaga(
    db => db.collection(`rooms/${id}/objects`),
    "ROOM_OBJECT_CHANGES"
  );
  yield call(storeSaga);
};

const setObject = function*({ itemId, object }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/objects`)
      .doc(itemId)
      .set({
        ...object,
        t: Date.now()
      })
  );
};

// Fields
const listenFieldsChannel = function*({ id }) {
  const storeSaga = createStoreSaga(
    db => db.collection(`rooms/${id}/fields`),
    "ROOM_FIELD_CHANGES"
  );
  yield call(storeSaga);
};

const setField = function*({ field }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/fields`)
      .doc("main")
      .set({
        ...field,
        t: Date.now()
      })
  );
};

// Room
const roomInit = function*({ id }) {
  yield put({
    type: "ROOM_INIT",
    id
  });
  yield fork(listenMessagesChannel, { id });
  yield fork(listenTracksChannel, { id });
  yield fork(listenObjectsChannel, { id });
  yield fork(listenFieldsChannel, { id });
};

const userSaga = function*() {
  yield takeLatest("@ROOM_INIT", roomInit);
  yield takeEvery("@ROOM_MESSAGE_ADD", messageAdd);
  yield takeEvery("@ROOM_MESSAGE_RESET_ALL", messageResetAll);
  yield takeEvery("@ROOM_TRACK_SET", setTrack);
  yield takeEvery("@ROOM_OBJECT_SET", setObject);
  yield takeEvery("@ROOM_FIELD_SET", setField);
};

export default userSaga;
