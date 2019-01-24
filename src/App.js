import React from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/'

import Login from './containers/Login'
import Home from './containers/Home'
import Room from './containers/Room'

const App = () => {
  return <Router initialEntries={[{ pathname: '/' }]}>
    <Provider store={store}>
      <>
        <Route exact path="/" component={Login} />
        <Route exact path="/home" component={Home} />
        <Route exact path="/room/:id" component={Room} />
      </>
    </Provider>
  </Router>
}

export default App