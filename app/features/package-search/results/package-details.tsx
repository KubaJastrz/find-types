import Tooltip from '@reach/tooltip';
import clsx from 'clsx';

import { InlineLink } from '~/components/inline-link';
import type { PackageData } from '~/features/package-data';

import { useSourceCodeIcon } from './use-source-code-icon';

interface Props {
  packageData: PackageData;
  small?: boolean;
}

export function PackageDetails({ packageData, small }: Props) {
  const { name, version, description, links } = packageData;
  const RepositoryIcon = useSourceCodeIcon(links.repository);
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
          {RepositoryIcon && links.repository ? (
            <Tooltip label="source code">
              <a href={links.repository}>
                <RepositoryIcon className="w-5 h-5" />
              </a>
            </Tooltip>
          ) : null}
        </span>
      </div>
      {description ? <p className="text-sm">{description}</p> : null}
    </div>
  );
}
