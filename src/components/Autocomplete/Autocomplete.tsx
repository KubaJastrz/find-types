import React from 'react'
import {useCombobox} from 'downshift'
import useEventListener from '@use-it/event-listener'

import {Search} from '/@/components/Icons'

interface Props {
  label: string
  inputValue: string
  onInput: (inputText: string) => void
  autoFocus?: boolean
  placeholder?: string
}

export const Autocomplete: React.FC<Props> = ({
  label,
  inputValue,
  onInput,
  autoFocus = false,
  placeholder,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null)

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

  const {getLabelProps, getInputProps, getComboboxProps, getMenuProps} = useCombobox({
    inputValue,
    items: [],
  })

  return (
    <div className="w-full">
      <label {...getLabelProps()} className="block mb-1">
        {label}
      </label>
      <div {...getComboboxProps()} className="relative">
        <input
          {...getInputProps({
            ref: inputRef,
            onInput: ({currentTarget}) => onInput(currentTarget.value),
            autoFocus,
            placeholder,
            spellCheck: false,
            autoCapitalize: 'off',
            autoComplete: 'off',
            autoCorrect: 'off',
          })}
          className="pl-3 pr-10 leading-9 rounded outline-none bg-gray-blue-800 focus:bg-gray-blue-750 w-full shadow placeholder-gray-400 transition duration-100"
        />
        <div className="absolute right-0 top-0 h-full flex items-center pr-2">
          <button type="submit" title="Search" className="w-6 h-6 flex items-center justify-center">
            <span className="sr-only">Search</span>
            <Search className="w-5 h-5" />
          </button>
        </div>
      </div>
      <ul {...getMenuProps()}></ul>
    </div>
  )
}
