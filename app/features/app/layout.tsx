import { Link } from '@remix-run/react';
import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge';

import { GitHub } from '~/components/icons';
import { InlineLink } from '~/components/inline-link';
import { Tooltip } from '~/components/tooltip';

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-grow flex-col items-center">
      <Header />
      {children}
      <Footer className="mb-3 mt-auto" />
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
      className={twMerge(
        'p-2 pt-4 text-xs text-gray-blue-400 focus-within:text-gray-blue-100 hover:text-gray-blue-100 sm:text-sm',
        className,
      )}
    >
      <div className="mb-1 text-center">
        <Tooltip label="Source code">
          <a href="https://github.com/KubaJastrz/find-types" className="inline-block">
            <span className="sr-only">Source code</span>
            <GitHub className="h-6 w-6 sm:h-8 sm:w-8" />
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
