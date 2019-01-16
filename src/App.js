import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './stores/'

import Room from './routes/Room'
import Home from './routes/Home'
import User from './routes/User'

import _Test from './routes/_Test'

const App = () => (
  <Router initialEntries={[{ pathname: '/' }]}>
    <Provider store={store}>
      <div className="App">
        {/* <Route path="/" component={User} /> */}
        <Route exact path="/" component={Home} />
        <Route exact path="/room/:id" component={Room} />
        <Route exact path="/_test" component={_Test} />
      </div>
    </Provider>
  </Router>
)

export default App