import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export const InlineLink = forwardRef<HTMLAnchorElement, Props>(function InlineLink(
  { className, ...props },
  ref,
) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a ref={ref} {...props} className={twMerge("font-bold hover:underline", className)} />;
});
