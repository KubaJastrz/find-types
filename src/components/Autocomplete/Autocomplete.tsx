import React from 'react';
import { useCombobox } from 'downshift';
import DOMPurify from 'dompurify';

import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
import { Suggestion } from '@/types';
import * as Styled from './Autocomplete.styles';

function sanitizeSuggestion(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['em'],
  });
}

export interface Props {
  initialValue?: string;
  onInput: (inputText: string) => void;
  onSelect: (option?: Suggestion) => void;
  autoFocus?: boolean;
  placeholder?: string;
  items: Suggestion[];
  getOptionLabel: (option?: Suggestion) => string;
  getOptionValue: (option?: Suggestion) => string;
}

function Autocomplete({
  initialValue = '',
  onInput,
  onSelect,
  autoFocus,
  placeholder,
  items,
  getOptionLabel,
  getOptionValue,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(false);

  const {
    getComboboxProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox<Suggestion>({
    items,
    itemToString: getOptionValue,
    initialInputValue: initialValue,
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem);
    },
  });

  return (
    <label {...getLabelProps()}>
      <Styled.SuggestionBar {...getComboboxProps({})} isFocused={isFocused}>
        <Styled.TextInput
          {...getInputProps({
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            onInput: ({ target }: React.ChangeEvent<HTMLInputElement>) => onInput(target.value),
          })}
          autoFocus={autoFocus}
          placeholder={placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        <Styled.SearchButton type="submit" aria-label="Search" title="Search">
          <SearchIcon width={20} height={20} />
        </Styled.SearchButton>
      </Styled.SuggestionBar>
      <Styled.List {...getMenuProps()} isOpen={isOpen}>
        {items.map((item, index) => (
          <Styled.Item key={item.package.name} {...getItemProps({ item, index })}>
            <Styled.Button
              isHighlighted={highlightedIndex === index}
              dangerouslySetInnerHTML={{
                __html: sanitizeSuggestion(getOptionLabel(item)),
              }}
            />
          </Styled.Item>
        ))}
      </Styled.List>
    </label>
  );
}

export default Autocomplete;
