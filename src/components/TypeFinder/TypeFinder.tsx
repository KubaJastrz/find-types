import React from 'react'
import {useQuery} from 'react-query'

import {API} from '/@/api/client'
import {Autocomplete} from '/@/components/Autocomplete'
import {parsePackageString} from '/@/utils/common'
import {Flow} from '/@/components/Loading/Flow'
import {Results} from './Results'

interface Props {
  initialQuery?: string
  onQueryChange: (packageString?: string) => void
}

export const TypeFinder: React.FC<Props> = ({initialQuery, onQueryChange}) => {
  const [packageString, setPackageString] = React.useState('')

  const [packageKey, setPackageKey] = React.useState('')
  const {refetch, isLoading, failureCount, data, error} = useQuery({
    queryKey: ['details', packageKey],
    queryFn: () => API.getPackageDetails(packageKey),
    config: {
      enabled: !!packageKey,
    },
  })

  // fetch package details based on its unique key
  React.useEffect(() => {
    if (packageKey) {
      refetch()
    }
  }, [packageKey])

  const handleSearch = (packageString: string, isInitialQuery = false) => {
    const {name} = parsePackageString(packageString)
    if (!isInitialQuery) {
      onQueryChange(name)
    }
    if (!name) {
      return
    }
    setPackageKey(name)
  }

  // handle initial query
  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, true)
      setPackageString(initialQuery)
    } else {
      setPackageString('')
      setPackageKey('')
    }
  }, [initialQuery])

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault()
    handleSearch(packageString)
  }

  return (
    <div>
      <form name="types" onSubmit={handleSubmit} className="w-full">
        <Autocomplete
          label="npm package"
          placeholder={'eg. query-string (Press "/" to focus)'}
          inputValue={packageString}
          onInput={setPackageString}
          autoFocus
        />
      </form>
      <div className="mt-6 md:mt-12">
        {isLoading ? (
          <div className="text-center space-y-1 text-sm text-gray-blue-200">
            <Flow />
            {failureCount > 0 && <div>Retrying</div>}
          </div>
        ) : error ? (
          <div className="text-center">{error.message}</div>
        ) : data ? (
          <Results packageData={data.package} typesPackageData={data.typesPackage} />
        ) : null}
      </div>
    </div>
  )
}
