import DOMPurify from "dompurify";
import type { HTMLAttributes } from "react";
import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

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
        className={twMerge("flex-grow px-3 py-0.5 text-left", isHighlighted && "bg-gray-blue-600")}
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
    ALLOWED_TAGS: ["em"],
  });
}
