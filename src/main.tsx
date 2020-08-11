import './main.css'
import 'focus-visible'

import React from 'react'
import ReactDOM from 'react-dom'

import {App} from './App'

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'development') {
  ;(async () => {
    const {worker} = await import('./mocks/browser')
    worker.start()
  })()
}
