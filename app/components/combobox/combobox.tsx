import { Tooltip } from '@reach/tooltip';
import clsx from 'clsx';
import { useCombobox } from 'downshift';
import { useEffect, useRef } from 'react';
import { ClientOnly } from 'remix-utils';

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
  onEnter?: () => void;
  placeholder?: string;
  items: Item[];
  isLoading: boolean;
  getOptionLabel: (option?: Item | null) => string;
  getOptionValue: (option?: Item | null) => string;
  getOptionTitle?: (option?: Item | null) => string | undefined;
  required?: boolean;
}

export function Combobox<Item>({
  id,
  label,
  name,
  inputValue,
  onInput,
  onSelect,
  onEnter,
  placeholder,
  items,
  isLoading,
  getOptionLabel,
  getOptionValue,
  getOptionTitle = () => '',
  required = false,
}: Props<Item>) {
  const inputRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);

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

      if (type === useCombobox.stateChangeTypes.InputFocus && changes.inputValue === '') {
        return { ...changes, isOpen: false };
      }

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
    <div className="relative w-full">
      <div className="flex w-full">
        <label {...getLabelProps()} className="mb-1 block">
          {label}
        </label>
        <ClientOnly>
          {() => (
            <p className="ml-auto select-none text-sm text-gray-600 dark:text-gray-400">
              (Press{' '}
              <kbd title="forward slash" className="key">
                /
              </kbd>{' '}
              to focus)
            </p>
          )}
        </ClientOnly>
      </div>
      <div className="relative">
        <input
          {...getInputProps({
            ref: inputRef,
            onKeyDown: (event) => {
              if (event.key === 'Enter' && highlightedIndex === -1) {
                closeMenu();
                onEnter?.();
              }
            },
            onInput: ({ currentTarget }) => onInput(currentTarget.value),
            type: 'search',
            name,
            placeholder,
            required,
            spellCheck: false,
            autoCapitalize: 'off',
            autoComplete: 'off',
            autoCorrect: 'off',
          })}
          className="w-full rounded bg-gray-blue-800 pl-3 pr-10 leading-9 placeholder-neutral2 shadow outline-none transition duration-100 focus:bg-gray-blue-750"
        />
        <div className="absolute right-0 top-0 flex h-full items-center pr-2">
          <Tooltip label="search">
            <button
              ref={submitRef}
              type="submit"
              className="flex h-6 w-6 items-center justify-center"
            >
              <span className="sr-only">Search</span>
              <Search className="h-5 w-5" />
            </button>
          </Tooltip>
        </div>
      </div>
      <ul
        {...getMenuProps()}
        className={clsx(
          'absolute inset-x-0 z-1 mt-2 overflow-hidden rounded bg-gray-blue-700 py-1 shadow-md',
          {
            hidden: !isOpen,
          },
        )}
      >
        {isOpen ? (
          isLoading || items.length === 0 ? (
            <div className="pt-1 pb-2 text-center">
              <Flow />
            </div>
          ) : (
            items.map((item, index) => {
              return (
                <Suggestion
                  key={getOptionValue(item)}
                  label={getOptionLabel(item)}
                  title={getOptionTitle(item)}
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
