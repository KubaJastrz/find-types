import React from 'react';
import { stringify } from 'query-string';

import API from '@/api/Api';
import Autocomplete from '@/components/Autocomplete';
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

function getOptionLabel(suggestion?: Suggestion): string {
  return suggestion ? suggestion.highlight || suggestion.package.name : '';
}

function getOptionValue(suggestion?: Suggestion): string {
  return suggestion ? suggestion.package.name : '';
}

interface Props {
  initialQuery?: string;
}

function TypeFinder({ initialQuery = '' }: Props) {
  const [packageName, setPackageName] = React.useState(initialQuery);

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

  const handleSelect = React.useCallback(
    (suggestion?: Suggestion) => {
      const packageName = getOptionValue(suggestion);
      handleSearch(packageName);
    },
    [handleSearch],
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
        <Autocomplete
          initialValue={packageName}
          onInput={setPackageName}
          onSelect={handleSelect}
          autoFocus={true}
          placeholder="look for npm package"
          items={suggestions ?? []}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
        />
      </Styled.SearchForm>
      <Results response={packageResponse} />
    </>
  );
}

export default TypeFinder;
