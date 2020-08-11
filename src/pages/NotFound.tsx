import React from 'react'
import {Helmet} from 'react-helmet-async'

import {Layout, PageTitle} from '/@/components/Layout'

export const NotFound: React.FC = () => {
  return (
    <Layout>
      <Helmet>
        <title>Not Found</title>
      </Helmet>
      <PageTitle>404 Not Found</PageTitle>
    </Layout>
  )
}
