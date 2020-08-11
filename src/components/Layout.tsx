import React from 'react'

import styles from './Layout.module.css'
import {Footer} from './Footer'

export const Layout: React.FC = ({children}) => {
  return (
    <div className="flex flex-col flex-grow items-center">
      {children}
      <Footer className="mt-auto mb-3" />
    </div>
  )
}

export const PageTitle: React.FC = ({children}) => {
  return <h1 className={styles['page-title']}>{children}</h1>
}
