import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import {ReactQueryConfigProvider, ReactQueryProviderConfig} from 'react-query'
import RQD from 'react-query-devtools'

import {Home} from '/@/pages/Home'
import {NotFound} from '/@/pages/NotFound'

const queryConfig: ReactQueryProviderConfig = {
  queries: {
    retry: 1,
    staleTime: 10 * 60 * 1000, // 10 minutes
  },
}

export const App: React.FC = () => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
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
