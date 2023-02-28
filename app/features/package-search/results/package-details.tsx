import { Tooltip } from '@reach/tooltip';
import clsx from 'clsx';

import { InlineLink } from '~/components/inline-link';
import type { PackageData } from '~/server-services/package-data';

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
            className={clsx(
              'text-shadow-2px font-mono font-bold',
              small ? 'text-base' : 'text-lg md:text-xl',
            )}
          >
            {name}
          </InlineLink>
        </Tooltip>
        <span className="text-shadow-2px inline-block rounded-sm bg-gray-blue-700 p-1 py-0.5 font-mono text-xs font-bold leading-4">
          <span className="sr-only">version</span>
          {version}
        </span>
        <span className="inline-block text-gray-200">
          {RepositoryIcon && links.repository ? (
            <Tooltip label="source code">
              <a href={links.repository}>
                <RepositoryIcon className="h-5 w-5" />
              </a>
            </Tooltip>
          ) : null}
        </span>
      </div>
      {description ? <p className="text-sm">{description}</p> : null}
    </div>
  );
}
