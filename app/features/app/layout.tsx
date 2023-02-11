import { Tooltip } from '@reach/tooltip';
import { Link } from '@remix-run/react';
import clsx from 'clsx';
import type { ReactNode } from 'react';

import { GitHub } from '~/components/icons';
import { InlineLink } from '~/components/inline-link';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col flex-grow items-center">
      <Header />
      {children}
      <Footer className="mt-auto mb-3" />
    </div>
  );
}

function Header() {
  return (
    <header>
      <h1 className="page-title">
        <Link to="/">Find Types</Link>
      </h1>
    </header>
  );
}

function Footer({ className }: { className: string }) {
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
  );
}
