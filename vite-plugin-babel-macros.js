// @ts-check
const {transformSync} = require('@babel/core')

/**
 * @returns {import('vite').Plugin}
 */
export function babelMacros() {
  return {
    name: 'babel-macros',
    enforce: 'pre',
    transform(code, id) {
      if (!/\.(t|j)sx?$/.test(id) || id.includes('node_modules')) {
        return
      }

      const isTS = /\.tsx?$/.test(id)
      const isTSX = id.endsWith('.tsx')

      const result = transformSync(code, {
        plugins: [
          isTS && ['@babel/plugin-syntax-typescript', {isTSX}],
          '@babel/plugin-syntax-jsx',
          'babel-plugin-macros',
        ].filter(Boolean),
        filename: id,
        sourceMaps: true,
        sourceFileName: id,
      })

      if (id.includes('Layout.tsx')) {
        console.log(result.code)
      }

      return {
        code: result.code,
        map: result.map,
      }
    },
    // handleHotUpdate(ctx) {},
  }
}

/* eslint @typescript-eslint/no-var-requires:0 */
