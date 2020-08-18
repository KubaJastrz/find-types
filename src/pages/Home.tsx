import React from 'react'
import {Link, useSearchParams} from 'react-router-dom'

import {Layout, PageTitle} from '/@/components/Layout'
import {TypeFinder} from '/@/components/TypeFinder'

export const Home: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [initialQuery, setInitialQuery] = React.useState<string>()

  const handleQueryChange = React.useCallback(
    (packageName?: string) => {
      if (packageName) {
        searchParams.set('q', packageName)
      } else {
        searchParams.delete('q')
      }
      setSearchParams(searchParams)
    },
    [setSearchParams],
  )

  React.useEffect(() => {
    const packageName = searchParams.get('q')
    setInitialQuery(packageName || undefined)
  }, [searchParams])

  return (
    <Layout>
      <header>
        <PageTitle>
          <Link to="/">Find Types</Link>
        </PageTitle>
      </header>
      <main className="w-5/6 md:w-3/4 lg:w-7/12 xxl:w-1/3">
        <TypeFinder initialQuery={initialQuery} onQueryChange={handleQueryChange} />
      </main>
    </Layout>
  )
}
