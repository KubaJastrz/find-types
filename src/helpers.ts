import React from 'react';

export function createPackageString(name: string, version?: string): string {
  return name + (version ? `@${version}` : '');
}

export function parsePackageString(packageString?: string) {
  if (!packageString) {
    return {
      name: undefined,
      version: undefined,
    };
  }

  const trimmedString = packageString.trim();

  if (trimmedString.charAt(0) === '@') {
    const [, name, version] = trimmedString.split('@');
    return {
      name: `@${name}`.trimRight().toLowerCase(),
      version: version && version.trim(),
    };
  }

  const [name, version] = trimmedString.split('@');
  return {
    name: name && name.trim().toLowerCase(),
    version: version && version.trim(),
  };
}

// scoped packages should be parsed like this: @foo/bar -> foo__bar
// https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
const typesPrefix = '@types/';
export function getTypesPackageName(npmPackage: string): string {
  const parsedName = npmPackage.replace('@', '').replace(/\//g, '__');
  return typesPrefix + parsedName;
}

export function getCdnFileLink(packageName: string, filename: string) {
  const parsedFilename = filename.startsWith('./') ? filename.replace('./', '') : filename;
  return `https://unpkg.com/${packageName}/${parsedFilename}`;
}

export function preventDefault(callback: () => void) {
  return (event: React.SyntheticEvent) => {
    event.preventDefault();
    callback();
  };
}
