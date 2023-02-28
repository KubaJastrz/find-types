import { InlineLink } from '~/components/inline-link';
import { getCdnFileLink, getTypesFileName, parseRelativePath } from '~/utils/package';

import { ErrorIcon, ResultEntry, ResultType, SuccessIcon } from './results-entry';

interface Props {
  packageName: string;
  packageJsonTypes: string | null;
}

export function DeclarationFiles({ packageName, packageJsonTypes }: Props) {
  return packageJsonTypes ? (
    <ResultEntry
      type={ResultType.success}
      icon={<SuccessIcon />}
      title="Built-in declaration files"
    >
      <ul className="list-disc pl-5 text-sm">
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
  );
}
