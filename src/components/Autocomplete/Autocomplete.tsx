import React from 'react';
import { useCombobox } from 'downshift';
import DOMPurify from 'dompurify';

import { ReactComponent as SearchIcon } from '@/assets/icons/search.svg';
import * as Styled from './Autocomplete.styles';

function sanitizeSuggestion(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['em'],
  });
}

export interface Props<TItem> {
  inputValue: string;
  onInput: (inputText: string) => void;
  onSelect: (option?: TItem) => void;
  onKeyDownEnter: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  autoFocus?: boolean;
  placeholder?: string;
  items: TItem[];
  getOptionLabel: (option?: TItem) => string;
  getOptionValue: (option?: TItem) => string;
}

function Autocomplete<TItem>({
  inputValue,
  onInput,
  onSelect,
  onKeyDownEnter,
  autoFocus = false,
  placeholder,
  items,
  getOptionLabel,
  getOptionValue,
}: Props<TItem>) {
  const [isFocused, setIsFocused] = React.useState(autoFocus);

  const {
    getComboboxProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox<TItem>({
    items,
    itemToString: getOptionValue,
    inputValue,
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem);
    },
    stateReducer: (state, action) => {
      if (
        action.type === useCombobox.stateChangeTypes.InputChange &&
        action.changes.inputValue === ''
      ) {
        return {
          ...action.changes,
          isOpen: false,
        };
      }

      if (action.type === useCombobox.stateChangeTypes.InputKeyDownEnter) {
        return {
          ...action.changes,
          isOpen: false,
        };
      }

      return action.changes;
    },
  });

  return (
    <label {...getLabelProps()}>
      <Styled.SuggestionBar {...getComboboxProps()} isFocused={isFocused}>
        <Styled.TextInput
          {...getInputProps({
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            onInput: ({ currentTarget }) => onInput(currentTarget.value),
            onKeyDown: event => {
              if (event.key === 'Enter' && (!isOpen || highlightedIndex === -1)) {
                onKeyDownEnter(event);
              }
            },
          })}
          autoFocus={autoFocus}
          placeholder={placeholder}
          spellCheck={false}
          autoCapitalize="off"
          autoComplete="off"
          autoCorrect="off"
        />
        <Styled.SearchButton
          type="submit"
          aria-label="Search"
          title="Search"
          disabled={!inputValue}
        >
          <SearchIcon width={20} height={20} />
        </Styled.SearchButton>
      </Styled.SuggestionBar>
      <Styled.List {...getMenuProps()} isOpen={isOpen}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Styled.Item key={getOptionValue(item)} {...getItemProps({ item, index })}>
              <Styled.Button
                isHighlighted={highlightedIndex === index}
                dangerouslySetInnerHTML={{
                  __html: sanitizeSuggestion(getOptionLabel(item)),
                }}
              />
            </Styled.Item>
          ))
        ) : (
          <Styled.Loading>Loading...</Styled.Loading>
        )}
      </Styled.List>
    </label>
  );
}

export default Autocomplete;
