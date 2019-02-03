import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import roomReducer from "./room";
import userReducer from "./user";
import settingReducer from "./setting";

const createRootReducer = hisotry =>
  combineReducers({
    router: connectRouter(hisotry),
    setting: settingReducer,
    room: roomReducer,
    user: userReducer
  });

export default createRootReducer;
