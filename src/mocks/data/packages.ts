import type {PackageResponseData} from '/@/types/api'

const packages: Record<string, PackageResponseData> = {
  ky: {
    package: {
      name: 'ky',
      version: '0.23.0',
      description: 'Tiny and elegant HTTP client based on the browser Fetch API',
      links: {
        npm: 'https://www.npmjs.com/package/ky',
        repository: 'https://github.com/sindresorhus/ky',
      },
    },
    typesPackage: {
      statusCode: 404,
      message: 'Package "@types/ky" not found',
    },
  },
  react: {
    package: {
      name: 'react',
      version: '16.13.1',
      description: 'React is a JavaScript library for building user interfaces.',
      links: {
        homepage: 'https://reactjs.org/',
        npm: 'https://www.npmjs.com/package/react',
        repository: 'https://github.com/facebook/react/tree/master/packages/react',
      },
    },
    typesPackage: {
      name: '@types/react',
      version: '16.9.43',
      description: 'TypeScript definitions for React',
      links: {
        npm: 'https://www.npmjs.com/package/@types/react',
        repository: 'https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/types/react',
      },
      types: 'index.d.ts',
    },
  },
  vue: {
    package: {
      name: 'vue',
      version: '2.6.11',
      description: 'Reactive, component-oriented view layer for modern web interfaces.',
      links: {
        homepage: 'https://github.com/vuejs/vue#readme',
        npm: 'https://www.npmjs.com/package/vue',
        repository: 'https://github.com/vuejs/vue',
      },
      types: 'types/index.d.ts',
    },
    typesPackage: {
      name: '@types/vue',
      version: '2.0.0',
      description:
        'Stub TypeScript definitions entry for vuejs, which provides its own types definitions',
      links: {
        npm: 'https://www.npmjs.com/package/@types/vue',
        repository: 'https://github.com/vuejs/vue',
      },
      deprecated: true,
    },
  },
  'fake-git': {
    package: {
      name: 'fake-git',
      version: '0.0.0',
      description: 'description',
      links: {
        npm: 'https://www.npmjs.com/package/fake-git',
        repository: 'https://fake-git.com',
      },
    },
    typesPackage: {
      statusCode: 404,
      message: 'not found',
    },
  },
  'fake-gitlab': {
    package: {
      name: 'fake-gitlab',
      version: '0.0.0',
      description: 'description',
      links: {
        npm: 'https://www.npmjs.com/package/fake-gitlab',
        repository: 'https://gitlab.com/fake',
      },
    },
    typesPackage: {
      statusCode: 404,
      message: 'not found',
    },
  },
  'fake-bitbucket': {
    package: {
      name: 'fake-bitbucket',
      version: '0.0.0',
      description: 'description',
      links: {
        npm: 'https://www.npmjs.com/package/fake-bitbucket',
        repository: 'https://bitbucket.org/fake',
      },
    },
    typesPackage: {
      statusCode: 404,
      message: 'not found',
    },
  },
}

async function read(name: string) {
  return packages[name]
}

export const packageDB = {read}
