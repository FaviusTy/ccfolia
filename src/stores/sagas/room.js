import { select, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { db } from "../../firebase/core";
import { createStoreSaga } from "../../firebase/saga";

const listenMessagesChannel = function*({ id }) {
  if (id) {
    const messagesStoreSaga = createStoreSaga(
      db => db.collection(`rooms/${id}/messages`),
      "ROOM_MESSAGE_CHANGES"
    );
    yield call(messagesStoreSaga);
  }
};

const messageAdd = function*({ message }) {
  const uid = yield select(state => state.user.uid);
  const id = yield select(state => state.room.id);
  if (uid && id) {
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

const roomInit = function*({ id }) {
  yield put({
    type: "ROOM_INIT",
    id
  });
};

const userSaga = function*() {
  yield takeLatest("@ROOM_INIT", roomInit);
  yield takeLatest("@ROOM_INIT", listenMessagesChannel);
  yield takeEvery("@ROOM_MESSAGE_ADD", messageAdd);
  yield takeEvery("@ROOM_MESSAGE_RESET_ALL", messageResetAll);
};

export default userSaga;
