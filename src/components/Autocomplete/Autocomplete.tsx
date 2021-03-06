import Tooltip from '@reach/tooltip'
import useEventListener from '@use-it/event-listener'
import clsx from 'clsx'
import {useCombobox} from 'downshift'
import React from 'react'

import {Search} from '@/components/Icons'
import {Flow} from '@/components/Loading'

import {Suggestion} from './Suggestion'

interface Props<Item> {
  label: string
  name?: string
  inputValue: string
  onInput: (inputText: string) => void
  onSelect: (option?: Item | null) => void
  placeholder?: string
  items: Item[]
  isLoading: boolean
  getOptionLabel: (option?: Item | null) => string
  getOptionValue: (option?: Item | null) => string
}

export function Autocomplete<Item>({
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
}: Props<Item>) {
  const inputRef = React.useRef<HTMLInputElement>(null)
  const submitRef = React.useRef<HTMLButtonElement>(null)

  useEventListener<'keydown'>(
    'keydown',
    (event) => {
      if (event.key === '/' && event.target !== inputRef.current) {
        // prevent slash `/` from being typed into search box
        event.preventDefault()
        inputRef.current?.focus()
      }
    },
    window,
  )

  const {
    getLabelProps,
    getInputProps,
    getComboboxProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    isOpen,
  } = useCombobox({
    inputValue,
    items,
    itemToString: getOptionValue,
    onSelectedItemChange: ({selectedItem}) => {
      onSelect(selectedItem)
    },
    stateReducer: (state, actionAndChanges) => {
      const {type, changes} = actionAndChanges

      if (type === useCombobox.stateChangeTypes.InputChange && changes.inputValue === '') {
        return {...changes, isOpen: false}
      }

      if (type === useCombobox.stateChangeTypes.InputKeyDownEnter) {
        return {...changes, isOpen: false}
      }

      return changes
    },
  })

  return (
    <div className="w-full relative">
      <label {...getLabelProps()} className="block mb-1">
        {label}
      </label>
      <div {...getComboboxProps()} className="relative">
        <input
          {...getInputProps({
            ref: inputRef,
            name,
            onInput: ({currentTarget}) => onInput(currentTarget.value),
            onKeyDown: (event) => {
              if (event.key === 'Enter' && highlightedIndex === -1) {
                submitRef.current?.click()
              }
            },
            placeholder,
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
                  {...getItemProps({item, index})}
                />
              )
            })
          )
        ) : null}
      </ul>
    </div>
  )
}
