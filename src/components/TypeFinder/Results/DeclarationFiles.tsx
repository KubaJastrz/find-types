import React from 'react';

import ResultEntry from './ResultEntry';
import { SuccessIcon, ErrorIcon } from './statusIcons';
import { parseRelativePath, getCdnFileLink } from '@/helpers';
import { Link } from '@/components/Framework';
import * as Styled from './Results.styles';

interface Props {
  packageName: string;
  packageJsonTypes?: string;
}

function DeclarationFiles({ packageName, packageJsonTypes }: Props) {
  return packageJsonTypes ? (
    <ResultEntry type="success" icon={<SuccessIcon />} title="Built-in declaration files">
      <Styled.FileList>
        <li>
          <Link href={getCdnFileLink(packageName, packageJsonTypes)}>
            {parseRelativePath(packageJsonTypes)}
          </Link>
        </li>
      </Styled.FileList>
    </ResultEntry>
  ) : (
    <ResultEntry type="neutral" icon={<ErrorIcon />} title="No built-in declaration files" />
  );
}

export default DeclarationFiles;
