import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";
import { store, history } from "./stores";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Room from "./pages/Room";
import StyledRoom from "./pages/StyledRoom";
import ShowCase from "./pages/ShowCase";

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          <Route exact path="/" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/rooms/:id" component={Room} />
          <Route exact path="/srooms/:id" component={StyledRoom} />
          <Route exact path="/__components__" component={ShowCase} />
        </>
      </Router>
    </Provider>
  );
};

export default App;
