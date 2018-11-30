import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Room from './pages/Room'
import Home from './pages/Home'

const App = () => (
  <Router initialEntries={[{ pathname: '/' }]}>
    <div className="App">
      <Route path="/" component={Home} />
    </div>
  </Router>
)

export default App