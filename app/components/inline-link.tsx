import clsx from 'clsx';
import type { AnchorHTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
};

export const InlineLink = forwardRef<HTMLAnchorElement, Props>(function InlineLink(
  { className, ...props },
  ref,
) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a ref={ref} {...props} className={clsx('font-bold hover:underline', className)} />;
});
