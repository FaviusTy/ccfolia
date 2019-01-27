import { takeEvery, call, select } from "redux-saga/effects";
import { db } from "../../../firebase/core";

// watcher
const characterSaga = function*() {
  yield takeEvery("@ROOM_ADD", console.log);
  yield takeEvery("@ROOM_SET", console.log);
  yield takeEvery("@ROOM_DELETE", console.log);
};

export default characterSaga;
