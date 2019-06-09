export function parsePackageString(packageString: string) {
    const [name, version] = packageString.split('@');
    return { name, version };
}

export function makePackageString(name: string, version: string) {
    return name + (version ? `@${version}` : '');
}
