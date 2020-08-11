export function parsePackageString(packageString?: string) {
  if (!packageString) {
    return {
      name: undefined,
      version: undefined,
    }
  }

  const trimmedString = packageString.trim()

  if (trimmedString.charAt(0) === '@') {
    const [, name, version] = trimmedString.split('@')
    return {
      name: `@${name}`.trimRight().toLowerCase(),
      version: version && version.trim(),
    }
  }

  const [name, version] = trimmedString.split('@')
  return {
    name: name && name.trim().toLowerCase(),
    version: version && version.trim(),
  }
}

export function parseRelativePath(pathToFile: string) {
  return pathToFile.startsWith('./') ? pathToFile.replace('./', '') : pathToFile
}

export function getCdnFileLink(packageName: string, pathToFile: string) {
  const parsedPath = parseRelativePath(pathToFile)
  return `https://unpkg.com/${packageName}/${parsedPath}`
}

// scoped packages should be parsed like this: @foo/bar -> foo__bar
// https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
export function getTypesPackageName(npmPackage: string) {
  const parsedName = npmPackage.replace('@', '').replace(/\//g, '__')
  return `@types/${parsedName}`
}
