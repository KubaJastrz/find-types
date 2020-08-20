import React from 'react'
import clsx from 'clsx'

type Props = React.AnchorHTMLAttributes<HTMLAnchorElement>

export const InlineLink = React.forwardRef<HTMLAnchorElement, Props>(function InlineLink(
  {className, ...props},
  ref,
) {
  return <a ref={ref} {...props} className={clsx('font-bold hover:underline', className)} />
})
