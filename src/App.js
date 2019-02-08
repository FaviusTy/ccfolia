import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";
import { store, history } from "./stores";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Room from "./pages/Room";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/rooms/:id" component={Room} />
        </>
      </Router>
    </Provider>
  );
};

export default App;
