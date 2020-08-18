import {rest} from 'msw'
import {delay} from '../utils/mocks'
import {packageDB} from './data/packages'
import {SuggestionsResponseData} from '../types/api'

export const handlers = [
  rest.get('/api/package', async (req, res, ctx) => {
    const name = req.url.searchParams.get('name')

    if (!name) {
      await delay(150)
      return res(
        ctx.status(400),
        ctx.json({
          statusCode: 400,
          message: 'Package `name` must be a valid string',
        }),
      )
    }

    const packageData = await packageDB.read(name)

    if (!packageData) {
      await delay(150)
      return res(
        ctx.status(404),
        ctx.json({
          statusCode: 404,
          message: `Package "${name}" not found`,
        }),
      )
    }

    await delay(300)
    return res(ctx.status(200), ctx.json(packageData))
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

    await delay(1000)
    return res(ctx.status(200), ctx.json(response))
  }),
]
