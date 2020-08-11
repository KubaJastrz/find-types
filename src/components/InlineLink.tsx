import React from 'react'
import clsx from 'clsx'

export const InlineLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({
  className,
  ...props
}) => {
  return <a {...props} className={clsx('font-bold hover:underline', className)} />
}
