export class HttpError extends Error {
  public response: Response;

  constructor(response: Response) {
    super(`${response.status} - ${response.statusText}`);
    this.name = "HttpError";
    this.response = response;
  }
}

export interface ErrorResponseData {
  statusCode: number;
  message: string;
}

export function isErrorResponse(value: any): value is ErrorResponseData {
  return "statusCode" in value && "message" in value;
}

export class FetchError extends Error {
  public response: ErrorResponseData;

  constructor(statusCode: number, message: string) {
    super(message);
    this.name = "FetchError";
    this.response = FetchError.createResponse(statusCode, message);
  }

  public static createResponse = (statusCode: number, message: string): ErrorResponseData => ({
    statusCode,
    message,
  });
}
