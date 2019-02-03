import { combineReducers } from "redux";
import { createReducer } from "../../modules/redux-utils";

const screenReducer = createReducer(
  { scale: 1 },
  {
    SETTING_SCREEN: (state, { scale }) => {
      return {
        ...state,
        scale
      };
    },
    SETTING_SCREEN_SCALE_DOWN: (state) => {
      return {
        ...state,
        scale: ~~(state.scale * 10 - 1) / 10
      };
    },
    SETTING_SCREEN_SCALE_UP: (state) => {
      return {
        ...state,
        scale: ~~(state.scale * 10 + 1) / 10
      };
    }
  }
);

export default combineReducers({
  screen: screenReducer
});
