export function createPackageString(name: string, version?: string): string {
    return name + (version ? `@${version}` : '');
}

export function parsePackageString(packageString: string) {
    const trimmedString = packageString.trim();

    if (trimmedString.charAt(0) === '@') {
        const [, name, version] = trimmedString.split('@');
        return {
            name: `@${name}`.trimRight(),
            version: version && version.trim(),
        };
    }

    const [name, version] = trimmedString.split('@');
    return {
        name: name && name.trim(),
        version: version && version.trim(),
    };
}

// scoped packages should be parsed like this: @foo/bar -> foo__bar
// https://github.com/DefinitelyTyped/DefinitelyTyped#what-about-scoped-packages
const typesPrefix = '@types/';
export function getTypesPackageName(npmPackage: string) {
    const parsedName = npmPackage.replace('@', '').replace(/\//g, '__');
    return typesPrefix + parsedName;
}
