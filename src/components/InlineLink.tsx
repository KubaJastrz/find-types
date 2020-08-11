import React from 'react'

export const InlineLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = (props) => {
  return <a {...props} className="font-bold hover:underline" />
}
