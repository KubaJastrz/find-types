import React from 'react'
import DOMPurify from 'dompurify'
import clsx from 'clsx'

import styles from './Suggestion.module.css'

interface Props extends React.HTMLAttributes<HTMLLIElement> {
  label: string
  isHighlighted: boolean
}

export const Suggestion = React.forwardRef<HTMLLIElement, Props>(function Suggestion(
  {label, isHighlighted, ...rest},
  ref,
) {
  return (
    <li {...rest} ref={ref} className={clsx('flex', styles['suggestion'])}>
      <button
        className={clsx('flex-grow text-left px-3 py-0.5', {
          'bg-gray-blue-600': isHighlighted,
        })}
        dangerouslySetInnerHTML={{
          __html: sanitizeSuggestion(label),
        }}
        type="button"
      />
    </li>
  )
})

function sanitizeSuggestion(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['em'],
  })
}
