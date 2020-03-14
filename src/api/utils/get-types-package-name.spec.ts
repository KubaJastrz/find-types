import { getTypesPackageName } from './get-types-package-name';

describe('getTypesPackageName', () => {
  it('prepends types prefix to package name', () => {
    expect(getTypesPackageName('vue')).toBe('@types/vue');
  });

  it('prepends types prefix to package name to scoped packages', () => {
    expect(getTypesPackageName('@vue/cli')).toBe('@types/vue__cli');
  });
});
