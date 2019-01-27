import { createReducer } from "../../modules/redux-utils";

const initialStte = {
  uid: null,
  displayName: ""
};
const authReducer = createReducer(initialStte, {
  SIGN_IN: (state, { user }) => {
    if (user) {
      // login
      return {
        ...state,
        displayName: user.displayName,
        uid: user.uid,
        isGuest: user.isAnonymous,
        initialized: true
      };
    } else {
      // logout
      return {
        ...initialStte,
        initialized: true
      };
    }
  }
});

export default authReducer;
