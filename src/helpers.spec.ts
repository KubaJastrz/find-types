import { createPackageString, parsePackageString } from './helpers';

describe('createPackageString', () => {
    it('concats name and version', () => {
        expect(createPackageString('vue', '3.0')).toBe('vue@3.0');
    });

    it('skips version if not provided', () => {
        expect(createPackageString('vue')).toBe('vue');
    });

    it('handles scoped packages', () => {
        expect(createPackageString('@vue/cli')).toBe('@vue/cli');
    });
});

describe('parsePackageString', () => {
    it('extracts name and version', () => {
        expect(parsePackageString('vue@3.0')).toMatchObject({ name: 'vue', version: '3.0' });
    });

    it('skips version if not found', () => {
        expect(parsePackageString('vue')).toMatchObject({ name: 'vue', version: undefined });
    });

    it('handles scoped packages', () => {
        expect(parsePackageString('@vue/cli@3.0')).toMatchObject({
            name: '@vue/cli',
            version: '3.0',
        });
    });
});
