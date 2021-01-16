import clsx from 'clsx'
import React from 'react'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: React.ReactNode
}

export const InlineLink = React.forwardRef<HTMLAnchorElement, Props>(function InlineLink(
  {className, ...props},
  ref,
) {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a ref={ref} {...props} className={clsx('font-bold hover:underline', className)} />
})
