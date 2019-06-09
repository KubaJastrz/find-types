export function createPackageString(name: string, version?: string): string {
    return name + (version ? `@${version}` : '');
}

export function parsePackageString(packageString: string) {
    const [name, version] = packageString.split('@');
    return { name, version };
}
