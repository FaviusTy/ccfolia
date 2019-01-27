import { createReducer } from "../../modules/redux-utils";
import { collectionReducer } from "../../firebase/reducer";

const authReducer = createReducer([], {
  SIGN_IN: () => {
    return [];
  },
  ROOM_CHANGES: collectionReducer
});

export default authReducer;
