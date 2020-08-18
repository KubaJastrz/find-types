import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ReactQueryConfigProvider} from 'react-query'
import RQD from 'react-query-devtools'

import {Home} from '/@/pages/Home'
import {NotFound} from '/@/pages/NotFound'

export const App: React.FC = () => {
  return (
    <ReactQueryConfigProvider
      config={{
        queries: {
          retry: 1,
        },
      }}
    >
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      <RQD.ReactQueryDevtools initialIsOpen={true} />
    </ReactQueryConfigProvider>
  )
}
