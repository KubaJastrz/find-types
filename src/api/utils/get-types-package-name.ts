// scoped packages should be parsed like this: @foo/bar -> foo__bar
// https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
export function getTypesPackageName(npmPackage: string) {
  const parsedName = npmPackage.replace('@', '').replace(/\//g, '__');
  return `@types/${parsedName}`;
}
