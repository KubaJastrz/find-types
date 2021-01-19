import 'twin.macro'

import React from 'react'

import {Footer} from './Footer'
import styles from './Layout.module.css'

export const Layout: React.FC = ({children}) => {
  return (
    <div tw="flex flex-col flex-grow items-center">
      {children}
      <Footer tw="mt-auto mb-3" />
    </div>
  )
}

export const PageTitle: React.FC = ({children}) => {
  return <h1 className={styles['page-title']}>{children}</h1>
}
