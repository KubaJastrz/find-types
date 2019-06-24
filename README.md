# Find Types

Complete search engine for TypeScript definitions.

## Motivation

I've often struggled with following questions:

-   Does this npm package provide its own definitions?
-   Or maybe I need to install a separate DefinitelyTyped package?
-   Is this `@types` package up-to-date?

Official [TypeSearch](https://microsoft.github.io/TypeSearch/) website only lists `@types` packages
from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository.

There are also some tools that help with installing `@types` packages:

-   [TypeSync](https://github.com/jeffijoe/typesync) - scan your `package.json` and install missing `@types`
-   [Types auto installer](https://marketplace.visualstudio.com/items?itemName=jvitor83.types-autoinstaller) - VSCode extension for installing/uninstalling `@types`

As a fan of utility websites, and heavily inpsired by Bundlephobia, I decided to create my own
search engine. Also, I wanted to try out [Vue.js](https://vuejs.org/) for the first time :v:

## Features

Current list of supported features:

-   npm package search with convenient autosuggestions
-   brief package details with links to npm registry and source code repository
-   direct link to DefinitelyTyped repository for `@types`
-   deprecated `@types` package warning
-   scan through `package.json` and distribution files for types definitions
-   URL query (`/?q`) for custom in-browser search engines

Is there anything missing you'd like to see? [File an issue](https://github.com/KubaJastrz/find-types/issues/new).

## Contributing

Pull-requests are always welcome :smiley:

### Setup

Install node dependencies with your package manager (preferably `yarn`) and start up the development
server.

```bash
yarn install
yarn start
```

Don't forget to test and lint your changes before comitting (although `prettier` should be applied
automatically to staged files).

```bash
yarn test
yarn lint
```

## License

MIT
