import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Room from './routes/Room'
import Home from './routes/Home'
import Auth from './routes/Auth'

const App = () => (
  <Router initialEntries={[{ pathname: '/' }]}>
    <div className="App">
      <Route path="/" component={Auth} />
      <Route exact path="/" component={Home} />
      <Route exact path="/room/:id" component={Room} />
    </div>
  </Router>
)

export default App