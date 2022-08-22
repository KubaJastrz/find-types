import { Form, useNavigate } from '@remix-run/react';
import type { FormEventHandler } from 'react';
import { useId } from 'react';
import { useEffect, useRef, useState } from 'react';

import { Combobox } from '~/components/combobox';

import type { SuggestionsResponseData } from './suggestions';
import { useSuggestions } from './suggestions';

interface Props {
  initialQuery?: string;
}

export function PackageSearch({ initialQuery = '' }: Props) {
  const comboboxId = useId();

  const submitRef = useRef<HTMLInputElement>(null);

  const [packageString, setPackageString] = useState(initialQuery);

  const { data: suggestions, isLoading: isSuggestionsLoading } = useSuggestions(packageString);
  const hasUserSelectedSuggestion = useRef(false);

  const handleSuggestionSelect = (suggestion?: SuggestionsResponseData | null) => {
    const packageName = getOptionValue(suggestion);
    setPackageString(packageName);
    hasUserSelectedSuggestion.current = true;
  };

  useEffect(() => {
    if (hasUserSelectedSuggestion.current) {
      submitRef.current?.click();
      hasUserSelectedSuggestion.current = false;
    }
  }, [packageString]);

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler = (event) => {
    event.preventDefault();
    const cleanName = packageString.trim().toLowerCase();
    navigate(`/package/${cleanName}`);
  };

  return (
    <Form
      onSubmit={handleSubmit}
      // needed for disabled JS
      action="/package"
      method="get"
    >
      <input ref={submitRef} type="submit" className="hidden" />
      <Combobox
        id={comboboxId}
        label="npm package"
        name="packageName"
        placeholder="eg. typescript"
        isLoading={isSuggestionsLoading}
        items={suggestions ?? []}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        inputValue={packageString}
        onInput={setPackageString}
        onSelect={handleSuggestionSelect}
        required
      />
    </Form>
  );
}

function getOptionLabel(suggestion?: SuggestionsResponseData | null): string {
  return suggestion ? suggestion.highlight || suggestion.package.name : '';
}

function getOptionValue(suggestion?: SuggestionsResponseData | null): string {
  return suggestion ? suggestion.package.name : '';
}
