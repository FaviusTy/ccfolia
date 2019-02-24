import firebase from "@firebase/app";
import "@firebase/firestore";
import "@firebase/auth";
import "@firebase/storage";

import config from "../config/firebase";

firebase.initializeApp(config);

export const db = firebase.firestore();
export const auth = firebase.auth();
export const providers = {
  twitter: new firebase.auth.TwitterAuthProvider()
};
export const storage = firebase.storage();

auth.useDeviceLanguage();
