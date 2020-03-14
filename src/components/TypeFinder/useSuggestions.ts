import React from 'react';
import useAsyncEffect from '@n1ru4l/use-async-effect';
import { useDebouncedCallback } from 'use-debounce';

import API from '@/api-client';
import { SuggestionsResponseData } from '@/types/api';
import { parsePackageString } from '@/helpers';

function useSuggestions(packageName: string) {
  const [suggestionsResponse, setSuggestionsResponse] = React.useState<SuggestionsResponseData[]>();

  const [fetchSuggestions] = useDebouncedCallback(async (packageName: string) => {
    const response = await API.getSuggestions(packageName);
    setSuggestionsResponse(response);
  }, 200);

  useAsyncEffect(
    function*() {
      if (packageName.length > 0) {
        const { name } = parsePackageString(packageName);
        if (!name) {
          return;
        }
        yield fetchSuggestions(name);
      } else {
        setSuggestionsResponse([]);
      }
    },
    [packageName],
  );

  return suggestionsResponse;
}

export default useSuggestions;
