import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Room from './routes/Room'
import Home from './routes/Home'

const App = () => (
  <Router initialEntries={[{ pathname: '/' }]}>
    <div className="App" style={{ height: '100vh', width: '100vw' }}>
      <Route exact path="/" component={Home} />
      <Route path="/room/:id" component={Room} />
    </div>
  </Router>
)

export default App