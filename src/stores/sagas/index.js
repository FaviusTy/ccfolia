import { put, fork, call, takeEvery } from "redux-saga/effects";

import roomSaga from "./room";
import userSaga from "./user";

const initialSaga = function*() {
  yield put({ type: "@APP_INIT" });
};

const rootSaga = function*() {
  yield takeEvery("*", console.log);
  yield call(initialSaga);
  yield fork(roomSaga);
  yield fork(userSaga);
};

export default rootSaga;
