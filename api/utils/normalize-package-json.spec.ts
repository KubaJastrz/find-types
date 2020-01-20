import { PackageJson } from 'type-fest';

import { normalizePackageJson } from './normalize-package-json';

const packageJson: PackageJson = {
  name: 'test',
  version: '1.0.0',
};

describe('normalizePackageJson', () => {
  const testNormalizer = (input: PackageJson['repository'], output: string) => {
    expect(normalizePackageJson({ ...packageJson, repository: input })).toMatchObject({
      ...packageJson,
      repository: output,
    });
  };

  it('normalizes repository url from object', () => {
    testNormalizer(
      { type: 'git', url: 'git@github.com:KubaJastrz/find-types.git' },
      'https://github.com/KubaJastrz/find-types',
    );
  });

  it('normalizes repository url from string', () => {
    testNormalizer(
      { type: 'git', url: 'github:KubaJastrz/find-types' },
      'https://github.com/KubaJastrz/find-types',
    );

    testNormalizer(
      { type: 'git', url: 'gitlab:KubaJastrz/find-types' },
      'https://gitlab.com/KubaJastrz/find-types',
    );

    testNormalizer(
      { type: 'git', url: 'bitbucket:KubaJastrz/find-types' },
      'https://bitbucket.org/KubaJastrz/find-types',
    );

    // defaults to github
    testNormalizer(
      { type: 'git', url: 'KubaJastrz/find-types' },
      'https://github.com/KubaJastrz/find-types',
    );
  });
});
