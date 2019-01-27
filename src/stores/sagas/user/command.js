import { takeEvery, call, select } from "redux-saga/effects";
import { db } from "../../../firebase/core";

// watcher
const commandSaga = function*() {
  yield takeEvery("@COMMAND_ADD", console.log);
  yield takeEvery("@COMMAND_SET", console.log);
  yield takeEvery("@COMMAND_DELETE", console.log);
};

export default commandSaga;
