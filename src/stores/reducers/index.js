import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import roomReducer from "./room";
import userReducer from "./user";

const createRootReducer = hisotry =>
  combineReducers({
    router: connectRouter(hisotry),
    room: roomReducer,
    user: userReducer
  });

export default createRootReducer;
