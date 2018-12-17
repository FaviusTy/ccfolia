import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import App from './App'
import './styles/index.css'
import 'react-datasheet/lib/react-datasheet.css';

ReactDOM.render((
  <App />
), document.getElementById('root'))

registerServiceWorker()
