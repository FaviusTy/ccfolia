import { eventChannel } from "redux-saga";
import {
  select,
  call,
  put,
  cancelled,
  take,
  takeLatest,
  takeEvery
} from "redux-saga/effects";
import { auth, db } from "../../firebase/core";

const createRoomChannel = uid =>
  eventChannel(emit => {
    return db
      .collection("rooms")
      .where("owner", "==", uid)
      .onSnapshot(snapshot => {
        emit(snapshot.docChanges());
      });
  });

const takeRoomChannel = function*({ user }) {
  if (user) {
    const channel = yield call(createRoomChannel, user.uid);
    try {
      while (true) {
        const changes = yield take(channel);
        yield put({
          type: "ROOM_CHANGES",
          changes
        });
      }
    } finally {
      if (yield cancelled()) {
        channel.close();
      }
    }
  }
};

const roomAdd = function*() {
  const uid = yield select(state => state.user.uid);
  if (uid) {
    const collection = db.collection("rooms");
    yield call(() => collection.add({ owner: uid }));
  }
};

const roomDelete = function*({ id }) {
  const doc = db.collection("rooms").doc(id);
  yield call(() => doc.delete());
};

const createAuthChannel = () =>
  eventChannel(emit => {
    return auth.onAuthStateChanged(user => {
      emit(user);
    });
  });

const takeAuthChannel = function*() {
  const authChannel = yield call(createAuthChannel);
  while (true) {
    const user = yield take(authChannel);
    yield put({ type: "@SIGN_IN", user });
    yield put({ type: "SIGN_IN", user });
  }
};

const userSaga = function*() {
  yield takeLatest("@SIGN_IN", takeRoomChannel);
  yield takeEvery("@ROOM_ADD", roomAdd);
  yield takeEvery("@ROOM_DELETE", roomDelete);
  yield call(takeAuthChannel);
};

export default userSaga;
