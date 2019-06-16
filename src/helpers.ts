export function createPackageString(name: string, version?: string): string {
    return name + (version ? `@${version}` : '');
}

export function parsePackageString(packageString: string) {
    const trimmedString = packageString.trim();

    if (trimmedString.charAt(0) === '@') {
        const [, name, version] = trimmedString.split('@');
        return { name: `@${name}`, version };
    }

    const [name, version] = trimmedString.split('@');
    return { name, version };
}
