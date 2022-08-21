import Tooltip from '@reach/tooltip';
import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { useEffect, useRef, useState } from 'react';

import { ClientOnly } from '~/components/client-only';
import { Search } from '~/components/icons';
import { Flow } from '~/components/loading';

import { Suggestion } from './suggestion';

interface Props<Item> {
  id: string;
  label: string;
  name?: string;
  inputValue: string;
  onInput: (inputText: string) => void;
  onSelect: (option?: Item | null) => void;
  placeholder?: string;
  items: Item[];
  isLoading: boolean;
  getOptionLabel: (option?: Item | null) => string;
  getOptionValue: (option?: Item | null) => string;
  required?: boolean;
}

export function Combobox<Item>({
  id,
  label,
  name,
  inputValue,
  onInput,
  onSelect,
  placeholder,
  items,
  isLoading,
  getOptionLabel,
  getOptionValue,
  required = false,
}: Props<Item>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const listener = (event: KeyboardEvent) => {
      if (event.key === '/' && event.target !== inputRef.current) {
        // prevent slash `/` from being typed into search box
        event.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', listener);
    return () => {
      window.removeEventListener('keydown', listener);
    };
  }, []);

  const {
    getLabelProps,
    getInputProps,
    getComboboxProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
    closeMenu,
  } = useCombobox({
    id,
    inputValue,
    items,
    itemToString: getOptionValue,
    onSelectedItemChange: ({ selectedItem }) => {
      onSelect(selectedItem);
    },
    stateReducer: (state, actionAndChanges) => {
      const { type, changes } = actionAndChanges;

      if (type === useCombobox.stateChangeTypes.InputChange && changes.inputValue === '') {
        return { ...changes, isOpen: false };
      }

      if (type === useCombobox.stateChangeTypes.InputKeyDownEnter) {
        return { ...changes, isOpen: false };
      }

      return changes;
    },
  });

  return (
    <div className="w-full relative">
      <div className="w-full flex">
        <label {...getLabelProps()} className="block mb-1">
          {label}
        </label>
        <ClientOnly>
          <p className="ml-auto text-sm text-gray-600 dark:text-gray-400 select-none">
            (Press{' '}
            <kbd title="forward slash" className="key">
              /
            </kbd>{' '}
            to focus)
          </p>
        </ClientOnly>
      </div>
      <div {...getComboboxProps()} className="relative">
        <input
          {...getInputProps({
            ref: inputRef,
            onKeyDown: (event) => {
              if (event.key === 'Enter' && highlightedIndex === -1) {
                closeMenu();
              }
            },
            onInput: ({ currentTarget }) => onInput(currentTarget.value),
            onFocus: () => setIsFocused(true),
            onBlur: () => setIsFocused(false),
            type: 'search',
            name,
            placeholder,
            required,
            spellCheck: false,
            autoCapitalize: 'off',
            autoComplete: 'off',
            autoCorrect: 'off',
          })}
          className="pl-3 pr-10 leading-9 rounded outline-none bg-gray-blue-800 focus:bg-gray-blue-750 w-full shadow placeholder-neutral2 transition duration-100"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2">
          <Tooltip label="search">
            <button
              ref={submitRef}
              type="submit"
              className="w-6 h-6 flex items-center justify-center"
            >
              <span className="sr-only">Search</span>
              <Search className="w-5 h-5" />
            </button>
          </Tooltip>
        </div>
      </div>
      <ul
        {...getMenuProps()}
        className={clsx(
          'absolute inset-x-0 bg-gray-blue-700 mt-2 rounded shadow-md overflow-hidden py-1 z-1',
          {
            hidden: !isOpen,
          },
        )}
      >
        {isOpen ? (
          isLoading || items.length === 0 ? (
            <div className="text-center pt-1 pb-2">
              <Flow />
            </div>
          ) : (
            items.map((item, index) => {
              return (
                <Suggestion
                  key={getOptionValue(item)}
                  label={getOptionLabel(item)}
                  isHighlighted={index === highlightedIndex}
                  {...getItemProps({ item, index })}
                />
              );
            })
          )
        ) : null}
      </ul>
    </div>
  );
}
