import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";
import { createBrowserHistory } from "history";

import rootSaga from "./sagas";
import createRootReducer from "./reducers";

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

export const store = createStore(
  createRootReducer(history),
  applyMiddleware(sagaMiddleware, routerMiddleware(history))
);

sagaMiddleware.run(rootSaga);
