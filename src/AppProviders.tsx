import React from 'react'
import {ReactQueryConfigProvider, ReactQueryConfigProviderProps} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig: ReactQueryConfigProviderProps['config'] = {
  queries: {
    retry(failureCount, error) {
      if ((error as any)?.response?.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
    staleTime: 10 * 60 * 1000, // 10 minutes
  },
}

export const AppProviders: React.FC = ({children}) => {
  return (
    <React.StrictMode>
      <ReactQueryConfigProvider config={queryConfig}>
        <Router>{children}</Router>
      </ReactQueryConfigProvider>
    </React.StrictMode>
  )
}
