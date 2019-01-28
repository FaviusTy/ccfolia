import { select, call, takeLatest, takeEvery } from "redux-saga/effects";
import { createStoreSaga, authSaga } from "../../firebase/saga";
import { db } from "../../firebase/core";


const listenRoomsChannel = function*({ user }) {
  if (user.uid) {
    const roomsStoreSaga = createStoreSaga(
      db => db.collection("rooms").where("owner", "==", user.uid),
      "ROOM_CHANGES"
    )
    yield call(roomsStoreSaga);
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

const userSaga = function*() {
  yield takeLatest("@SIGN_IN", listenRoomsChannel);
  yield takeEvery("@ROOM_ADD", roomAdd);
  yield takeEvery("@ROOM_DELETE", roomDelete);
  yield call(authSaga);
};

export default userSaga;
