# Find Types

<a href="https://www.npmjs.com/package/tippy.js">
  <img alt="Pipeline Validate Status" src="https://img.shields.io/github/workflow/status/KubaJastrz/find-types/Validate">
<a>
<a href="https://github.com/atomiks/tippyjs/blob/master/LICENSE">
  <img alt="MIT License" src="https://img.shields.io/github/license/KubaJastrz/find-types">
</a>

Complete search engine for TypeScript definitions. Available online at [find-types.now.sh](https://find-types.now.sh/).

## Features

Current list of supported features:

- npm package search with convenient autosuggestions
- brief package details with links to npm registry and source code repository
- direct link to package living in a monorepo (such as DefinitelyTyped)
- deprecated `@types` package warning
- URL query ([`/?q=<package>`](https://find-types.now.sh/?q=%s)) for custom in-browser search engines

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

Fork the repository, install node dependencies with `npm` and start up the development server.

```bash
npm install
npm start
```

## License

[MIT](LICENSE)
