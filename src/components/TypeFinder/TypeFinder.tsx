import React from 'react';
import { stringify } from 'query-string';

import API from '@/api/Api';
import Autosuggest from '@/components/Autosuggest';
import { PackageResponseData } from '@/types/api';
import { Suggestion } from '@/types';
import { parsePackageString, preventDefault } from '@/helpers';
import Results from './Results';
import * as Styled from './TypeFinder.styles';
import useSuggestions from './useSuggestions';

function pushHistory(packageName: string) {
  const url = stringify({ q: packageName });
  window.history.pushState(null, '', `/?${url}`);
}

function extractPackageNameFromSuggestion(suggestion: Suggestion): string {
  return suggestion ? suggestion.package.name : '';
}

interface Props {
  initialQuery?: string;
}

function TypeFinder({ initialQuery }: Props) {
  const [packageName, setPackageName] = React.useState(initialQuery ?? '');

  // Suggestions
  const suggestions = useSuggestions(packageName);

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

  // Initial Query
  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, true);
    }
  }, [handleSearch, initialQuery]);

  return (
    <>
      <Styled.SearchForm onSubmit={preventDefault(handleSearch)}>
        <Autosuggest
          initialValue={packageName}
          onChange={setPackageName}
          onSelect={handleSearch}
          autoFocus={true}
          placeholder="look for npm package"
          items={suggestions ?? []}
          getValueFromItem={extractPackageNameFromSuggestion}
        />
      </Styled.SearchForm>
      <Results response={packageResponse} />
    </>
  );
}

export default TypeFinder;
