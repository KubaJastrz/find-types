import {parsePackageString, getTypesPackageName} from './common'

describe('parsePackageString', () => {
  it('extracts name and version', () => {
    expect(parsePackageString('vue@3.0')).toMatchObject({name: 'vue', version: '3.0'})
  })

  it('skips version if not found', () => {
    expect(parsePackageString('vue')).toMatchObject({name: 'vue', version: undefined})
  })

  it('works with invalid input', () => {
    expect(parsePackageString('')).toMatchObject({name: undefined, version: undefined})
    expect(parsePackageString()).toMatchObject({name: undefined, version: undefined})
  })

  it('handles scoped packages', () => {
    expect(parsePackageString('@vue/cli@3.0')).toMatchObject({
      name: '@vue/cli',
      version: '3.0',
    })
  })

  it('trims name and version', () => {
    expect(parsePackageString(' vue ')).toMatchObject({name: 'vue'})
    expect(parsePackageString(' vue @ 3.0 ')).toMatchObject({name: 'vue', version: '3.0'})
  })

  it('trims scoped name and version', () => {
    expect(parsePackageString(' @vue/cli ')).toMatchObject({name: '@vue/cli'})
    expect(parsePackageString(' @vue/cli @ 3.0 ')).toMatchObject({
      name: '@vue/cli',
      version: '3.0',
    })
  })

  it('transforms name to lower case', () => {
    expect(parsePackageString('VuE')).toMatchObject({name: 'vue'})
    expect(parsePackageString('vUe@3.0')).toMatchObject({name: 'vue', version: '3.0'})
  })
})

describe('getTypesPackageName', () => {
  it('prepends types prefix to package name', () => {
    expect(getTypesPackageName('vue')).toBe('@types/vue')
  })

  it('prepends types prefix to package name to scoped packages', () => {
    expect(getTypesPackageName('@vue/cli')).toBe('@types/vue__cli')
  })
})
