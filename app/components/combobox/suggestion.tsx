import clsx from 'clsx';
import DOMPurify from 'dompurify';
import type { HTMLAttributes } from 'react';
import { forwardRef } from 'react';

interface Props extends HTMLAttributes<HTMLLIElement> {
  label: string;
  isHighlighted: boolean;
}

export const Suggestion = forwardRef<HTMLLIElement, Props>(function Suggestion(
  { label, isHighlighted, ...rest },
  ref,
) {
  return (
    <li {...rest} ref={ref} className="search-suggestion flex">
      <button
        className={clsx('flex-grow px-3 py-0.5 text-left', {
          'bg-gray-blue-600': isHighlighted,
        })}
        dangerouslySetInnerHTML={{
          __html: sanitizeSuggestion(label),
        }}
        type="button"
      />
    </li>
  );
});

function sanitizeSuggestion(html: string) {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['em'],
  });
}
