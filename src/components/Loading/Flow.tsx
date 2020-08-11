import React from 'react'

export const Flow: React.FC = () => {
  return (
    <div className="inline-flex space-x-1.5">
      <div className="h-1.5 w-1.5 rounded-full animate-flow"></div>
      <div className="h-1.5 w-1.5 rounded-full animate-flow"></div>
      <div className="h-1.5 w-1.5 rounded-full animate-flow"></div>
    </div>
  )
}
