import {ErrorResponseData} from '/@/types/api'

export class FetchError extends Error {
  constructor(statusCode: number, message: string) {
    super(message)
    Error.captureStackTrace(this, this.constructor)
    this.name = 'FetchError'
    this.response = FetchError.createResponse(statusCode, message)
  }

  response: ErrorResponseData

  static createResponse = (statusCode: number, message: string): ErrorResponseData => ({
    statusCode,
    message,
  })

  static isFetchError = (error: any): error is FetchError => {
    return error.name === 'FetchError'
  }
}
