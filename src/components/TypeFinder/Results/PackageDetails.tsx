import clsx from 'clsx'
import React from 'react'

import type {PackageData} from '/@/types/api'
import {InlineLink} from '/@/components/InlineLink'
import {useSourceCodeIcon} from './useSourceCodeIcon'
import Tooltip from '@reach/tooltip'

interface Props {
  packageData: PackageData
  small?: boolean
}

export const PackageDetails: React.FC<Props> = ({packageData, small}) => {
  const {name, version, description, links} = packageData
  const RepositoryIcon = useSourceCodeIcon(links.repository)
  return (
    <div className="space-y-1">
      <div className="flex items-center space-x-4">
        <Tooltip label="npm registry">
          <InlineLink
            href={links.npm}
            className={clsx('font-mono font-bold', small ? 'text-base' : 'text-lg md:text-xl')}
          >
            {name}
          </InlineLink>
        </Tooltip>
        <span className="inline-block p-1 py-0.5 leading-4 text-xs font-bold rounded-sm bg-gray-blue-700 text-shadow-px">
          <span className="sr-only">version</span>
          {version}
        </span>
        <span className="inline-block text-gray-200">
          {RepositoryIcon ? (
            <Tooltip label="source code">
              <a href={links.repository}>
                <RepositoryIcon className="w-5 h-5" />
              </a>
            </Tooltip>
          ) : null}
        </span>
      </div>
      {description && <p className="text-sm">{description}</p>}
    </div>
  )
}
