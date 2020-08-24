import '@reach/tooltip/styles.css'
import 'focus-visible'
import './main.css'

import React from 'react'
import ReactDOM from 'react-dom'

import {App} from './App'
import {AppProviders} from './AppProviders'

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>,
  document.getElementById('root'),
)

if (process.env.NODE_ENV === 'development') {
  ;(async () => {
    const {worker} = await import('./mocks/browser')
    worker.start()
  })()
}
