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
import { db } from "../../firebase/core";

const createMessageChannel = id =>
  eventChannel(emit => {
    return db
      .collection(`rooms/${id}/messages`)
      .onSnapshot(snapshot => {
        emit(snapshot.docChanges());
      });
  });

const takeMessageChannel = function*({ id }) {
  if (id) {
    const channel = yield call(createMessageChannel, id);
    try {
      while (true) {
        const changes = yield take(channel);
        yield put({
          type: "ROOM_MESSAGE_CHANGES",
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

const messageAdd = function* ({ message }) {
  const uid = yield select(state => state.user.uid);
  console.log(uid)

  // const uid = yield select(state => state.user.uid);
}

const userSaga = function*() {
  yield takeLatest("@ROOM_INIT", takeMessageChannel);
  yield takeEvery("@ROOM_MESSAGE_ADD", messageAdd);
};

export default userSaga;
