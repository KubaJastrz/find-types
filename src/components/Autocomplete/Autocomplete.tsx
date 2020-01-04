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
  inputValue: string;
  onInput: (inputText: string) => void;
  onSelect: (option?: Suggestion) => void;
  autoFocus?: boolean;
  placeholder?: string;
  items: Suggestion[];
  getOptionLabel: (option?: Suggestion) => string;
  getOptionValue: (option?: Suggestion) => string;
}

function Autocomplete({
  inputValue,
  onInput,
  onSelect,
  autoFocus = false,
  placeholder,
  items,
  getOptionLabel,
  getOptionValue,
}: Props) {
  const [isFocused, setIsFocused] = React.useState(autoFocus);
  const [isOpen, setIsOpen] = React.useState(false);

  const {
    getComboboxProps,
    getLabelProps,
    getInputProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
  } = useCombobox<Suggestion>({
    items,
    itemToString: getOptionValue,
    inputValue,
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem);
    },
    stateReducer: (state, action) => {
      if (isOpen !== action.changes.isOpen) {
        setIsOpen(action.changes.isOpen);
      }

      if (
        action.type === useCombobox.stateChangeTypes.InputChange &&
        action.changes.inputValue === ''
      ) {
        setIsOpen(false);
      }

      return action.changes;
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
            onKeyDown: event => {
              // downshift blocks submit event on Enter keydown
              if (event.key === 'Enter' && (!isOpen || highlightedIndex === -1)) {
                (event as any).preventDownshiftDefault = true;
                setIsOpen(false);
              } else {
                (event as any).preventDownshiftDefault = false;
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
        <Styled.SearchButton type="submit" aria-label="Search" title="Search">
          <SearchIcon width={20} height={20} />
        </Styled.SearchButton>
      </Styled.SuggestionBar>
      <Styled.List {...getMenuProps()} isOpen={isOpen}>
        {items.length > 0 ? (
          items.map((item, index) => (
            <Styled.Item key={item.package.name} {...getItemProps({ item, index })}>
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
