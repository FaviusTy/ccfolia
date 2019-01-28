import { call, take, put, cancelled } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { db, auth } from "./core";

const createStoreChannel = selector =>
  eventChannel(emit => {
    return selector(db).onSnapshot(snapshot => {
      emit(snapshot.docChanges());
    });
  });

export const createStoreSaga = (selector, actionType) =>
  function*() {
    const channel = yield call(createStoreChannel, selector);
    try {
      while (true) {
        const changes = yield take(channel);
        yield put({
          type: actionType,
          changes
        });
      }
    } finally {
      if (yield cancelled()) {
        channel.close();
      }
    }
  };

const createAuthChannel = () =>
  eventChannel(emit => {
    return auth.onAuthStateChanged(user => {
      emit(user);
    });
  });

export const authSaga = function*() {
  const authChannel = yield call(createAuthChannel);
  while (true) {
    const user = yield take(authChannel);
    yield put({ type: "@SIGN_IN", user });
    yield put({ type: "SIGN_IN", user });
  }
};
