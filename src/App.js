import React from "react";
import { Route, Link } from "react-router-dom";
import { ConnectedRouter as Router } from "connected-react-router";
import { Provider } from "react-redux";
import { store, history } from "./stores";

// import Login from "./pages/Login";
// import Home from "./pages/Home";
// import Room from "./pages/Room";
// import StyledRoom from "./pages/StyledRoom";
// import ShowCase from "./pages/ShowCase";

import Welcome from "./pages/proto/Welcome";
import Home from "./pages/proto/Home";
import Room from "./pages/proto/Room";
import CharacterSelect from "./pages/proto/Room/CharacterSelect";

const Navigation = () => {
  return (
    <div
      style={{
        background: "#ccc",
        position: "fixed",
        bottom: 0,
        left: 0,
        zIndex: 99999999999
      }}
    >
      <Link to="/">Welcome</Link>
      <Link to="/home">Home</Link>
      <Link to="/rooms/1">Room 1</Link>
      <Link to="/rooms/1/sounds">Room 1 Sounds</Link>
    </div>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Router history={history}>
        <>
          {/* <Route exact path="/" component={Login} /> */}
          {/* <Route exact path="/home" component={Home} /> */}
          {/* <Route exact path="/rooms/:id" component={Room} /> */}
          {/* <Route exact path="/srooms/:id" component={StyledRoom} /> */}
          {/* <Route exact path="/__components__" component={ShowCase} /> */}
          {/* <Navigation /> */}
          <Route exact path="/" component={Welcome} />
          <Route exact path="/home" component={Home} />
          {/* <Route exact path="/rooms" component={Rooms} /> */}
          <Route path="/rooms/:id" component={Room} />
          <Route path="/rooms/:id/characters" component={CharacterSelect} />
          <Route path="/rooms/:id/images" component={CharacterSelect} />
          <Route path="/rooms/:id/sounds" component={CharacterSelect} />
          {/* <Route path="/rooms/:id/fields" component={RoomFields} /> */}
        </>
      </Router>
    </Provider>
  );
};

export default App;
