import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";

import roomReducer from "./room";
import userReducer from "./user";
import roomsReducer from "./rooms";

const createRootReducer = hisotry =>
  combineReducers({
    router: connectRouter(hisotry),
    room: roomReducer,
    user: userReducer,
    rooms: roomsReducer
  });

export default createRootReducer;
