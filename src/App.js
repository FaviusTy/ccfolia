import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/'

import Login from './containers/Login'
import Home from './containers/Home'
import Room from './containers/Room'

const App = () => (
  <Router initialEntries={[{ pathname: '/' }]}>
    <Provider store={store}>
      <>
        <Route exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/room/:id" component={Room} />
      </>
    </Provider>
  </Router>
)

export default App