import React from 'react'
import {QueryClient, QueryClientProvider} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry(failureCount, error) {
        if ((error as any)?.response?.status === 404) return false
        else if (failureCount < 2) return true
        else return false
      },
      staleTime: 10 * 60 * 1000, // 10 minutes
    },
  },
})

export const AppProviders: React.FC = ({children}) => {
  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <Router>{children}</Router>
      </QueryClientProvider>
    </React.StrictMode>
  )
}
