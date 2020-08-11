import {rest} from 'msw'
import {delay} from '../utils/mocks'
import {packageDB} from './data/packages'

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
]
