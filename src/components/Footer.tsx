import Tooltip from '@reach/tooltip'
import clsx from 'clsx'
import React from 'react'

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
        <Tooltip label="Source code">
          <a href="https://github.com/KubaJastrz/find-types" className="inline-block">
            <span className="sr-only">Source code</span>
            <GitHub className="w-6 h-6 sm:w-8 sm:h-8" />
          </a>
        </Tooltip>
      </div>
      <p>
        Powered by{' '}
        <Tooltip label="node package registry">
          <InlineLink href="https://www.npmjs.com/">npm</InlineLink>
        </Tooltip>{' '}
        and{' '}
        <Tooltip label="cdn">
          <InlineLink href="https://unpkg.com/">unpkg</InlineLink>
        </Tooltip>
      </p>
    </footer>
  )
}
