import { combineReducers } from "redux";
import { createReducer } from "../../modules/redux-utils";
import { collectionReducer } from "../../firebase/reducer";

const identifyReducer = createReducer(null, {
  ROOM_INIT: (_, { id }) => id
});

const messagesReducer = createReducer([], {
  ROOM_INIT: () => [],
  ROOM_MESSAGE_CHANGES: collectionReducer
});

const tracksReducer = createReducer([], {
  ROOM_INIT: () => [],
  ROOM_TRACK_CHANGES: collectionReducer
});

const objectsReducer = createReducer([], {
  ROOM_INIT: () => [],
  ROOM_OBJECT_CHANGES: collectionReducer
});

const fieldsReducer = createReducer([], {
  ROOM_INIT: () => [],
  ROOM_FIELD_CHANGES: collectionReducer
});

const formReducer = createReducer(
  {},
  {
    ROOM_INIT: () => ({}),
    ROOM_FORM_SET: (state, { key, item }) => {
      return {
        ...state,
        [key]: item
      };
    }
  }
);

export default combineReducers({
  id: identifyReducer,
  messages: messagesReducer,
  fields: fieldsReducer,
  objects: objectsReducer,
  tracks: tracksReducer,
  form: formReducer
});
