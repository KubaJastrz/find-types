import {NowRequest, NowResponse} from '@vercel/node'

import type {PackageResponseData} from '@/types/api'

import {getTypesPackageName} from '../utils/common'
import {FetchError} from './utils/errors'
import {getPackageData} from './utils/get-package-data'

/**
 * Route handler
 */
export default async (req: NowRequest, res: NowResponse) => {
  const packageName = req.query.name

  if (!packageName || Array.isArray(packageName)) {
    const errorData = FetchError.createResponse(400, 'Package `name` must be a valid string')
    return res.status(errorData.statusCode).send(errorData)
  }

  let packageData: PackageResponseData['package']
  let typesPackageData: PackageResponseData['typesPackage']

  try {
    packageData = await getPackageData(packageName)
  } catch (error) {
    if (FetchError.isFetchError(error)) {
      return res.status(error.response.statusCode).send(error.response)
    }

    console.error(error)
    const errorData = FetchError.createResponse(500, 'Internal Server Error')
    return res.status(errorData.statusCode).send(errorData)
  }

  try {
    const typesPackageName = getTypesPackageName(packageName)
    typesPackageData = await getPackageData(typesPackageName)
  } catch (error) {
    if (FetchError.isFetchError(error)) {
      typesPackageData = error.response
    } else {
      console.error(error)
      const errorData = FetchError.createResponse(500, 'Internal Server Error')
      return res.status(errorData.statusCode).send(errorData)
    }
  }

  return res.json({
    package: packageData,
    typesPackage: typesPackageData,
  })
}
