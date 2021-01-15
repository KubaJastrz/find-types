import {rest} from 'msw'
import {packageDB} from './data/packages'
import {SuggestionsResponseData} from '../types/api'

export const handlers = [
  rest.get('/api/package', async (req, res, ctx) => {
    const name = req.url.searchParams.get('name')

    if (!name) {
      return res(
        ctx.delay(),
        ctx.status(400),
        ctx.json({
          statusCode: 400,
          message: 'Package `name` must be a valid string',
        }),
      )
    }

    const packageData = await packageDB.read(name)

    if (!packageData) {
      return res(
        ctx.delay(),
        ctx.status(404),
        ctx.json({
          statusCode: 404,
          message: `Package "${name}" not found`,
        }),
      )
    }

    return res(ctx.delay(), ctx.status(200), ctx.json(packageData))
  }),

  rest.get('https://api.npms.io/v2/search/suggestions', async (req, res, ctx) => {
    const query = req.url.searchParams.get('q')!.trim()
    const size = parseInt(req.url.searchParams.get('size')!, 10)
    const packages = await packageDB.readAll()

    const response: SuggestionsResponseData[] = Object.values(packages)
      .slice(0, size)
      .map((data) => {
        const {name, version} = data.package
        return {
          package: {
            name: name,
            version: version,
          },
          highlight: name.replace(new RegExp(`(${query})`), '<em>$1</em>'),
        }
      })

    return res(ctx.delay(1000), ctx.status(200), ctx.json(response))
  }),
]
