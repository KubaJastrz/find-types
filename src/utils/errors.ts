import {ErrorResponseData} from '../types/api'

export function isErrorResponse(value: any): value is ErrorResponseData {
  return 'statusCode' in value && 'message' in value
}
