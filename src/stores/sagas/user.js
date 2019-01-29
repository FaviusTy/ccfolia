import {
  takeEvery,
  takeLatest,
  select,
  fork,
  call,
  put
} from "redux-saga/effects";
import { push } from "connected-react-router";
import { auth, providers } from "../../firebase/core";
import { createStoreSaga, authSaga } from "../../firebase/saga";
import { db } from "../../firebase/core";

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
    yield call(() => collection.add({ owner: uid }));
  }
};

const deleteRoom = function*({ id }) {
  const doc = db.collection("rooms").doc(id);
  yield call(() => doc.delete());
};

const listenCharactersChannel = function*({ user }) {
  if (user.uid) {
    const roomsStoreSaga = createStoreSaga(
      db => db.collection("characters").where("owner", "==", user.uid),
      "USER_CHARACTER_CHANGES"
    );
    yield call(roomsStoreSaga);
  }
};

const setCharacter = function*({ id, character }) {
  const uid = yield select(state => state.user.uid);
  if (uid) {
    const doc = db.collection("characters").doc(id);
    yield call(() =>
      doc.set({
        ...character,
        owner: uid
      })
    );
  }
};

const deleteCharacter = function*({ id }) {
  const doc = db.collection("characters").doc(id);
  yield call(() => doc.delete());
};

const userInit = function*({ user }) {
  yield put({ type: "SIGN_IN", user });
  yield fork(listenRoomsChannel, { user });
  yield fork(listenCharactersChannel, { user });
};

const userSaga = function*() {
  yield takeLatest("@SIGN_IN_WITH_TWITTER", signInWithTwitter);
  yield takeLatest("@SIGN_IN_GUEST", signInGuest);

  yield takeLatest("@SIGN_IN", userInit);

  yield takeEvery("@ROOM_ADD", addRoom);
  yield takeEvery("@ROOM_DELETE", deleteRoom);
  yield takeEvery("@CHARACTER_SET", setCharacter);
  yield takeEvery("@CHARACTER_DELETE", deleteCharacter);
  yield fork(authSaga);
};

export default userSaga;
