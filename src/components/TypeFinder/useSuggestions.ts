import React from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { useDebouncedCallback } from 'use-debounce';

import API from '@/api/Api';
import { SuggestionsResponseData } from '@/types/api';
import { parsePackageString } from '@/helpers';

function useSuggestions(packageName: string) {
  const [suggestionsResponse, setSuggestionsResponse] = React.useState<SuggestionsResponseData[]>();
  const forPackage = React.useRef('');

  const [fetchSuggestions] = useDebouncedCallback(async (packageName: string) => {
    const response = await API.getSuggestions(packageName);
    setSuggestionsResponse(response);
    forPackage.current = packageName;
  }, 200);

  useAsyncEffect(
    function*() {
      if (packageName.length > 0) {
        const { name } = parsePackageString(packageName);
        // use cache if possible
        if (!name || name === forPackage.current) {
          return;
        }
        yield fetchSuggestions(name);
      } else {
        setSuggestionsResponse([]);
        forPackage.current = '';
      }
    },
    [packageName],
  );

  return suggestionsResponse;
}

export default useSuggestions;
