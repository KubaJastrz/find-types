import { Form, useNavigate } from '@remix-run/react';
import type { FormEventHandler } from 'react';
import { useId } from 'react';
import { useRef, useState } from 'react';

import { Combobox } from '~/components/combobox';

import type { SuggestionsResponseData } from './suggestions';
import { useSuggestions } from './suggestions';

interface PackageFormElement extends HTMLFormElement {
  elements: HTMLFormControlsCollection & {
    packageName: HTMLInputElement;
  };
}

interface Props {
  initialQuery?: string;
}

export function PackageSearch({ initialQuery = '' }: Props) {
  const comboboxId = useId();

  const submitRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<PackageFormElement>(null);

  const [packageString, setPackageString] = useState(initialQuery);

  const { data: suggestions, isLoading: isSuggestionsLoading } = useSuggestions(packageString);

  const handleSuggestionSelect = (suggestion?: SuggestionsResponseData | null) => {
    const packageName = getOptionValue(suggestion);
    if (formRef.current) {
      // Set the value for the upcoming form submission.
      // Submit will be attempted before the next render can happen.
      formRef.current.elements.packageName.value = packageName;
    }
    setPackageString(packageName);
    submitRef.current?.click();
  };

  const navigate = useNavigate();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const cleanName = (data.get('packageName') as string).trim().toLowerCase();
    navigate(`/package/${cleanName}`);
  };

  return (
    <Form
      ref={formRef}
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
        getOptionTitle={getOptionTitle}
        inputValue={packageString}
        onInput={setPackageString}
        onSelect={handleSuggestionSelect}
        onEnter={() => submitRef.current?.click()}
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

function getOptionTitle(suggestion?: SuggestionsResponseData | null): string {
  return suggestion ? suggestion.package.description : '';
}
