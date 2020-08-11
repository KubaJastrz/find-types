import React from 'react'
import clsx from 'clsx'

import {GitHub} from './Icons'
import {InlineLink} from './InlineLink'

interface Props {
  className?: string
}

export const Footer: React.FC<Props> = ({className}) => {
  return (
    <footer
      className={clsx(
        className,
        'p-2 pt-4 text-xs sm:text-sm text-gray-blue-400 hover:text-gray-blue-100 focus-within:text-gray-blue-100',
      )}
    >
      <div className="mb-1 text-center">
        <a
          href="https://github.com/KubaJastrz/find-types"
          title="Source code"
          className="inline-block"
        >
          <span className="sr-only">Source code</span>
          <GitHub className="w-6 h-6 sm:w-8 sm:h-8" />
        </a>
      </div>
      <p>
        Powered by{' '}
        <InlineLink href="https://www.npmjs.com/" title="Node Package Registry">
          npm
        </InlineLink>{' '}
        and{' '}
        <InlineLink href="https://unpkg.com/" title="Content Delivery Network">
          unpkg
        </InlineLink>
      </p>
    </footer>
  )
}
