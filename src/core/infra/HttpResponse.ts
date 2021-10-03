export type HttpResponse = {
  statusCode: number
  body: any
}

export function created(): HttpResponse {
  return {
    statusCode: 201,
    body: undefined,
  }
}

export function clientError(error: Error): HttpResponse {
  return {
    statusCode: 400,
    body: {
      error: error.message,
    },
  }
}

export function conflict(error: Error): HttpResponse {
  return {
    statusCode: 409,
    body: {
      error: error.message,
    },
  }
}

export function fail(error: Error) {
  console.log(error)

  return {
    statusCode: 500,
    body: {
      error: error.message,
    },
  }
}

export function ok<T>(dto?: T): HttpResponse {
  return {
    statusCode: 200,
    body: dto,
  }
}

export function forbidden(error: Error): HttpResponse {
  return {
    statusCode: 403,
    body: {
      error: error.message,
    },
  }
}
