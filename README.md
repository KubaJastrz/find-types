# Find Types

Complete search engine for TypeScript definitions. Available online at [find-types.now.sh](https://find-types.now.sh/).

## Features

Current list of supported features:

- npm package search with convenient autosuggestions
- brief package details with links to npm registry and source code repository
- direct link to DefinitelyTyped repository for `@types`
- deprecated `@types` package warning
- URL query (`/?q`) for custom in-browser search engines

Is there anything missing you'd like to see? [File an issue](https://github.com/KubaJastrz/find-types/issues/new).

## Motivation

I've often struggled with following questions:

- Does this npm package provide its own definitions?
- Or maybe I need to install a separate DefinitelyTyped package?
- Is this `@types` package up-to-date with the source code?

Official [TypeSearch](https://microsoft.github.io/TypeSearch/) website only lists `@types` packages
from [DefinitelyTyped](https://github.com/DefinitelyTyped/DefinitelyTyped) repository.

### Other solutions

- [TypeSync](https://github.com/jeffijoe/typesync) - scan your `package.json` and install missing `@types`
- [Types auto installer](https://marketplace.visualstudio.com/items?itemName=jvitor83.types-autoinstaller) - VSCode extension for installing/uninstalling `@types`

## Contributing

Pull Requests are always welcome :smiley:

### Setup

Install node dependencies with your package manager (preferably `yarn`) and start up the development
server.

> NOTE: you may need to use `npm start` on Windows due to `now dev` bug, see [more](https://github.com/zeit/now/issues/3407).

```bash
yarn install
yarn start
```

## License

[MIT](LICENSE)
