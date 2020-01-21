import { PackageJson } from 'type-fest';

import { normalizePackageJson, RepositoryObject } from './normalize-package-json';

const packageJson: PackageJson = {
  name: 'test',
  version: '1.0.0',
};

describe('normalizePackageJson', () => {
  const testNormalizer = (input: RepositoryObject | string, output: string) => {
    expect(normalizePackageJson({ ...packageJson, repository: input })).toMatchObject({
      ...packageJson,
      repository: output,
    });
  };

  it('normalizes repository url from object', () => {
    testNormalizer(
      { type: 'git', url: 'git@github.com:facebook/jest.git' },
      'https://github.com/facebook/jest',
    );
    testNormalizer(
      { type: 'git', url: 'git@github.com:facebook/jest.git', directory: 'packages/jest-cli' },
      'https://github.com/facebook/jest/tree/master/packages/jest-cli',
    );
    testNormalizer(
      { type: 'svn', url: 'https://v8.googlecode.com/svn/trunk/' },
      'https://v8.googlecode.com/svn/trunk/',
    );
  });

  it('normalizes repository url from string', () => {
    testNormalizer('facebook/jest', 'https://github.com/facebook/jest');

    // short version
    testNormalizer('github:facebook/jest', 'https://github.com/facebook/jest');
    testNormalizer('gitlab:facebook/jest', 'https://gitlab.com/facebook/jest');
    testNormalizer('bitbucket:facebook/jest', 'https://bitbucket.org/facebook/jest');
    testNormalizer('gist:user/123456890', 'https://gist.github.com/123456890');

    // full url
    testNormalizer('https://github.com/facebook/jest', 'https://github.com/facebook/jest');
    testNormalizer('https://v8.googlecode.com/svn/trunk/', 'https://v8.googlecode.com/svn/trunk/');
  });
});
