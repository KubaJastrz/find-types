import React from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { useDebouncedCallback } from 'use-debounce';
import { stringify } from 'query-string';

import API from '@/api/Api';
import Autosuggest from '@/components/Autosuggest';
import { PackageResponseData, SuggestionsResponseData } from '@/types/api';
import { parsePackageString, preventDefault } from '@/helpers';
import Results from './Results';
import * as Styled from './TypeFinder.styles';

function pushHistory(packageName: string) {
  const url = stringify({ q: packageName });
  window.history.pushState(null, '', `/?${url}`);
}

function extractPackageNameFromSuggestion(suggestion: SuggestionsResponseData): string {
  return suggestion ? suggestion.package.name : '';
}

interface Props {
  initialQuery?: string;
}

function TypeFinder({ initialQuery }: Props) {
  const [packageName, setPackageName] = React.useState(initialQuery ?? '');

  // Suggestions
  const [suggestionsResponse, setSuggestionsResponse] = React.useState<SuggestionsResponseData[]>();
  const [fetchSuggestions] = useDebouncedCallback(async (packageName: string) => {
    const response = await API.getSuggestions(packageName);
    setSuggestionsResponse(response);
  }, 200);

  useAsyncEffect(
    function*() {
      const { name } = parsePackageString(packageName);
      if (!name) {
        return;
      }
      yield fetchSuggestions(name);
    },
    [packageName],
  );

  // Package details
  const [packageResponse, setPackageResponse] = React.useState<PackageResponseData>();
  const fetchPackageDetails = React.useCallback(async (packageName: string) => {
    // const response = await API.getPackageDetails(packageName);
    const response = `result for '${packageName}'`;
    setPackageResponse(response);
  }, []);

  const handleSearch = React.useCallback(
    (packageName?: string, isInitialQuery = false) => {
      const { name } = parsePackageString(packageName);
      if (!name) {
        return;
      }
      if (!isInitialQuery) {
        pushHistory(name);
      }
      setPackageName(name);
      fetchPackageDetails(name);
    },
    [fetchPackageDetails],
  );

  const handleSelect = React.useCallback(
    (inputText: string) => {
      handleSearch(inputText);
    },
    [handleSearch],
  );

  // Initial Query
  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, true);
    }
  }, [fetchPackageDetails, handleSearch, initialQuery]);

  return (
    <>
      <Styled.SearchForm onSubmit={preventDefault(handleSearch)}>
        <Autosuggest
          initialValue={packageName}
          onChange={setPackageName}
          onSelect={handleSelect}
          autoFocus={true}
          placeholder="look for npm package"
          items={suggestionsResponse || []}
          getValueFromItem={extractPackageNameFromSuggestion}
        />
      </Styled.SearchForm>
      <Results response={packageResponse} />
    </>
  );
}

export default TypeFinder;
