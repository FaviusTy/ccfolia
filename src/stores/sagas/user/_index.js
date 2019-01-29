import { takeEvery, fork, call, put } from "redux-saga/effects";
import fileSaga from "./file";
import { auth, providers } from "../../../firebase/core";
import { push } from "connected-react-router";

const signInWithTwitter = function*() {
  yield call(() => auth.signInWithPopup(providers.twitter));
  yield put(push("/home"));
};

const signInGuest = function*() {
  yield call(() => auth.signInAnonymously());
  yield put(push("/home"));
};

// watcher
const userSaga = function*() {
  yield fork(fileSaga);
  yield takeEvery("INIT", console.log);
  yield takeEvery("@SIGN_IN_WITH_TWITTER", signInWithTwitter);
  yield takeEvery("@SIGN_IN_GUEST", signInGuest);
};

export default userSaga;
