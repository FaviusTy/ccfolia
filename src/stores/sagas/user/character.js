import { takeEvery, call, select } from "redux-saga/effects";
import { db } from "../../../firebase/core";

// watcher
const characterSaga = function*() {
  yield takeEvery("@CHARACTER_ADD", console.log);
  yield takeEvery("@CHARACTER_SET", console.log);
  yield takeEvery("@CHARACTER_DELETE", console.log);
};

export default characterSaga;
