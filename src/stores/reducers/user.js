import { combineReducers } from "redux";
import { createReducer } from "../../modules/redux-utils";
import { collectionReducer } from "../../firebase/reducer";

const identifyReducer = createReducer(null, {
  SIGN_IN: (_, { user }) => user.uid
});

const nameReducer = createReducer("GUEST", {
  SIGN_IN: (_, { user }) => user.displayName
});

const charactersReducer = createReducer([], {
  SIGN_IN: () => [],
  USER_CHARACTER_CHANGES: collectionReducer
});

const filesReducer = createReducer([], {
  SIGN_IN: () => [],
  USER_FILE_CHANGES: collectionReducer
});

const roomsReducer = createReducer([], {
  SIGN_IN: () => [],
  USER_ROOM_CHANGES: collectionReducer
});

export default combineReducers({
  uid: identifyReducer,
  name: nameReducer,
  files: filesReducer,
  characters: charactersReducer,
  rooms: roomsReducer
});
