import { combineReducers } from "redux";
import { createReducer } from "../../../modules/redux-utils";
import { collectionReducer } from "../../../firebase/reducer";

const identifyReducer = createReducer(null, {
  ROOM_INIT: (_, { id }) => id
});

const initialFormState = { object: null, table: false };
const formReducer = createReducer(initialFormState, {
  ROOM_INIT: () => initialFormState,
  FORM_SET: (state, { key, item }) => {
    return {
      ...state,
      [key]: item
    };
  },
  FORM_RESET: () => {
    return {
      ...initialFormState,
      table: false
    };
  }
});

const messagesReducer = createReducer([], {
  ROOM_INIT: () => [],
  ROOM_MESSAGE_CHANGES: collectionReducer
});

const objectsReducer = createReducer([], {
  ROOM_INIT: () => [],
  OBJECT_CHANGES: collectionReducer
});

const imagesReducer = createReducer([], {
  ROOM_INIT: () => [],
  TABLE_ADD_TEST: (state, { url }) => {
    return [...state, url];
  },
  IMAGES_CHANGES: collectionReducer
});

const initialTableState = {
  background: { url: "" },
  media: {
    url: "",
    loop: true,
    muted: true,
    volume: 0.1
  },
  field: {
    url: "",
    baseSize: 60,
    col: 16,
    row: 9,
    grid: 0,
    rotate: false
  }
};
const tableReducer = createReducer(initialTableState, {
  ROOM_INIT: () => initialTableState,
  TABLE_SET: (state, { item }) => {
    return {
      ...state,
      ...item
    };
  }
});

export default combineReducers({
  id: identifyReducer,
  form: formReducer,
  messages: messagesReducer,
  table: tableReducer,
  objects: objectsReducer,
  images: imagesReducer
});
