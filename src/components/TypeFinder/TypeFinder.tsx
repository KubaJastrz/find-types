import React, { FormEvent } from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { useDebouncedCallback } from 'use-debounce';
import { stringify } from 'query-string';

import API from '@/api/Api';
import { PackageResponseData, SuggestionsResponseData } from '@/types/api';
import { parsePackageString } from '@/helpers';
import Results from './Results';

interface Props {
  initialQuery?: string;
}

function pushHistory(packageName: string) {
  const url = stringify({ q: packageName });
  window.history.pushState(null, '', `/?${url}`);
}

function TypeFinder({ initialQuery }: Props) {
  const [packageName, setPackageName] = React.useState('');

  const [suggestionsResponse, setSuggestionsResponse] = React.useState<SuggestionsResponseData[]>();
  const [fetchSuggestions] = useDebouncedCallback(async (packageName: string) => {
    // const response = await API.getSuggestions(packageName);
    const response = `suggestions for '${packageName}'`;
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

  const [packageResponse, setPackageResponse] = React.useState<PackageResponseData>();
  const fetchPackageDetails = React.useCallback(async (packageName: string) => {
    // const response = await API.getPackageDetails(packageName);
    const response = `result for '${packageName}'`;
    setPackageResponse(response);
  }, []);

  const handleSearch = React.useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      const { name } = parsePackageString(packageName.toLowerCase());
      if (!name) {
        return;
      }
      pushHistory(name);
      setPackageName(name);
      fetchPackageDetails(name);
    },
    [fetchPackageDetails, packageName],
  );

  // `initialQuery` doesn't come on first render, so it can't live in React.useState(...)
  React.useEffect(() => {
    if (initialQuery) {
      const { name } = parsePackageString(initialQuery.toLowerCase());
      if (!name) {
        return;
      }
      setPackageName(name);
      fetchPackageDetails(name);
    }
  }, [fetchPackageDetails, initialQuery]);

  return (
    <>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={packageName}
          onChange={({ target }) => setPackageName(target.value)}
        />
      </form>
      <Results response={suggestionsResponse} />
      <Results response={packageResponse} />
    </>
  );
}

export default TypeFinder;
