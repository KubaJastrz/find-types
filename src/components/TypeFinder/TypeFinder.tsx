import React from 'react'

import {Autocomplete} from '/@/components/Autocomplete'
import {parsePackageString} from '/@/utils/common'
import {Flow} from '/@/components/Loading/Flow'
import {Results} from './Results'
import {useSuggestions} from './useSuggestions'
import {usePackageDetails} from './usePackageDetails'
import {SuggestionsResponseData} from '/@/types/api'

interface Props {
  initialQuery?: string
  onQueryChange: (packageString?: string) => void
}

export const TypeFinder: React.FC<Props> = ({initialQuery, onQueryChange}) => {
  const [packageString, setPackageString] = React.useState('')

  const {data: suggestions, isLoading: isSuggestionsLoading} = useSuggestions(
    parsePackageString(packageString).name ?? '',
  )

  const [packageKey, setPackageKey] = React.useState('')
  const {refetch, isLoading, failureCount, data, error} = usePackageDetails(packageKey)

  // fetch package details based on its unique key
  React.useEffect(() => {
    if (packageKey) {
      refetch()
    }
  }, [packageKey, refetch])

  const handleSearch = React.useCallback(
    (packageString: string, isInitialQuery = false) => {
      const {name} = parsePackageString(packageString)
      if (!isInitialQuery) {
        onQueryChange(name)
      }
      if (!name) {
        return
      }
      setPackageKey(name)
    },
    [onQueryChange],
  )

  // handle initial query
  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, true)
      setPackageString(initialQuery)
    } else {
      setPackageString('')
      setPackageKey('')
    }
  }, [handleSearch, initialQuery])

  const handleSelect = (suggestion?: SuggestionsResponseData | null) => {
    const packageName = getOptionValue(suggestion)
    handleSearch(packageName)
  }

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
          onSelect={handleSelect}
          items={suggestions || []}
          isLoading={isSuggestionsLoading}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
        />
      </form>
      <div className="mt-6 md:mt-12">
        {isLoading ? (
          <div className="text-center space-y-1 text-sm text-gray-blue-200">
            <Flow />
            {failureCount > 0 && <div>Retrying</div>}
          </div>
        ) : error ? (
          <div className="text-center">Failed: {error.message}</div>
        ) : data ? (
          <Results packageData={data.package} typesPackageData={data.typesPackage} />
        ) : null}
      </div>
    </div>
  )
}

function getOptionLabel(suggestion?: SuggestionsResponseData | null): string {
  return suggestion ? suggestion.highlight || suggestion.package.name : ''
}

function getOptionValue(suggestion?: SuggestionsResponseData | null): string {
  return suggestion ? suggestion.package.name : ''
}
