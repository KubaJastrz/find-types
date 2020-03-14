import React from 'react';
import { navigate } from '@reach/router';
import { stringify } from 'query-string';
import { useAsync, DeferFn, IfPending, IfFulfilled, IfRejected } from 'react-async';

import API from '@/api-client';
import Autocomplete from '@/components/Autocomplete';
import { Center } from '@/components/Framework';
import { PackageResponseData } from '@/types/api';
import { Suggestion } from '@/types';
import { parsePackageString, preventDefault } from '@/helpers';
import Results from './Results';
import * as Styled from './TypeFinder.styles';
import useSuggestions from './useSuggestions';

const getPackageDetails: DeferFn<PackageResponseData> = ([packageName]) =>
  API.getPackageDetails(packageName);

interface Props {
  initialQuery?: string;
}

function TypeFinder({ initialQuery = '' }: Props) {
  const [packageName, setPackageName] = React.useState(initialQuery);

  const suggestions = useSuggestions(packageName);

  const packageDataState = useAsync({
    deferFn: getPackageDetails,
  });
  const { run: fetchPackageDetails } = packageDataState;

  const handleSearch = React.useCallback(
    (packageName: string, isInitialQuery = false) => {
      const { name } = parsePackageString(packageName);
      if (!name) {
        return;
      }
      if (!isInitialQuery) {
        pushSearchToHistory(name);
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

  const handleSubmit = React.useCallback(
    preventDefault(() => {
      handleSearch(packageName);
    }),
    [packageName],
  );

  // Initial Query
  React.useEffect(() => {
    if (initialQuery) {
      handleSearch(initialQuery, true);
    }
  }, [initialQuery, handleSearch]);

  return (
    <>
      <Styled.SearchForm>
        <Autocomplete
          inputValue={packageName}
          onInput={setPackageName}
          onSelect={handleSelect}
          onSearch={handleSubmit}
          autoFocus={true}
          placeholder="look for npm package"
          items={suggestions ?? []}
          getOptionLabel={getOptionLabel}
          getOptionValue={getOptionValue}
        />
      </Styled.SearchForm>
      <Styled.SearchResults>
        <IfPending state={packageDataState}>
          <Center>Loading...</Center>
        </IfPending>
        <IfFulfilled state={packageDataState}>
          {data => <Results packageData={data.package} typesPackageData={data.typesPackage} />}
        </IfFulfilled>
        <IfRejected state={packageDataState}>
          {error => <Center>{error.message}</Center>}
        </IfRejected>
      </Styled.SearchResults>
    </>
  );
}

function pushSearchToHistory(packageName: string) {
  const url = stringify({ q: packageName });
  navigate(`/?${url}`);
}

function getOptionLabel(suggestion?: Suggestion): string {
  return suggestion ? suggestion.highlight || suggestion.package.name : '';
}

function getOptionValue(suggestion?: Suggestion): string {
  return suggestion ? suggestion.package.name : '';
}

export default TypeFinder;
