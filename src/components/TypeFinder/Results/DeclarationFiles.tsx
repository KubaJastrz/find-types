import React from 'react'

import {InlineLink} from '@/components/InlineLink'
import {getCdnFileLink, getTypesFileName, parseRelativePath} from '@/utils/common'

import {ErrorIcon, ResultEntry, ResultType, SuccessIcon} from './ResultEntry'

interface Props {
  packageName: string
  packageJsonTypes?: string
}

export const DeclarationFiles: React.FC<Props> = ({packageName, packageJsonTypes}) => {
  return packageJsonTypes ? (
    <ResultEntry
      type={ResultType.success}
      icon={<SuccessIcon />}
      title="Built-in declaration files"
    >
      <ul className="pl-5 text-sm list-disc">
        <li>
          <InlineLink href={getCdnFileLink(packageName, getTypesFileName(packageJsonTypes))}>
            {parseRelativePath(packageJsonTypes)}
          </InlineLink>
        </li>
      </ul>
    </ResultEntry>
  ) : (
    <ResultEntry
      type={ResultType.neutral}
      icon={<ErrorIcon />}
      title="No built-in declaration files"
    />
  )
}
