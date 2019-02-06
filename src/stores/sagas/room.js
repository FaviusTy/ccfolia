import {
  select,
  call,
  put,
  fork,
  take,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import { db } from "../../firebase/core";
import { createStoreSaga } from "../../firebase/saga";
import { DiceRoller } from "rpg-dice-roller";

const roller = new DiceRoller();

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
    const dice = roller.roll(message.text);
    if (dice.rolls.length > 0) {
      message.text = dice.toString();
    }
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

const updateObject = function*({ itemId, object }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/objects`)
      .doc(itemId)
      .set(
        {
          ...object,
          t: Date.now()
        },
        { merge: true }
      )
  );
};

const deleteObject = function*({ itemId }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/objects`)
      .doc(itemId)
      .delete()
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

const updateField = function*({ field }) {
  const id = yield select(state => state.room.id);
  yield call(() =>
    db
      .collection(`rooms/${id}/fields`)
      .doc("main")
      .set(
        {
          ...field,
          t: Date.now()
        },
        { merge: true }
      )
  );
};

// Files
const listenFilesChannel = function*({ id }) {
  let uid = yield select(state => state.user.uid);
  if (!uid) {
    const { user } = yield take("@SIGN_IN");
    uid = user.uid;
  }
  if (uid) {
    const roomsStoreSaga = createStoreSaga(
      db =>
        db
          .collection("files")
          .where("owner", "==", uid)
          .where("directory", "==", `rooms/${id}`),
      "ROOM_FILE_CHANGES"
    );
    yield call(roomsStoreSaga);
  }
};

const uploadAnyFiles = function*({ files }) {
  const id = yield select(state => state.room.id);
  let i = 0;
  while (files.length > i) {
    const file = files[i];
    // const fileType = file.contentType.split('/')[0]
    yield put({
      type: "@FILE_ADD",
      file: file,
      tags: [],
      directory: `rooms/${id}`
    });
    i++;
  }
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
  yield fork(listenFilesChannel, { id });
};

const userSaga = function*() {
  yield takeLatest("@ROOM_INIT", roomInit);
  yield takeEvery("@ROOM_MESSAGE_ADD", messageAdd);
  yield takeEvery("@ROOM_MESSAGE_RESET_ALL", messageResetAll);
  yield takeEvery("@ROOM_TRACK_SET", setTrack);
  yield takeEvery("@ROOM_OBJECT_SET", setObject);
  yield takeEvery("@ROOM_OBJECT_UPDATE", updateObject);
  yield takeEvery("@ROOM_OBJECT_DELETE", deleteObject);
  yield takeEvery("@ROOM_FIELD_SET", setField);
  yield takeEvery("@ROOM_FIELD_UPDATE", updateField);
  yield takeEvery("@ROOM_ANYFILES_UPLOAD", uploadAnyFiles);
};

export default userSaga;
