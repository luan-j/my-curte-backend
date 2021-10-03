import {
  ApolloError,
  AuthenticationError,
  ForbiddenError,
  UserInputError,
} from 'apollo-server-errors'
import { ExpressContext } from 'apollo-server-express'

import { Controller } from '../Controller'

export const adaptResolver = async (
  controller: Controller,
  args?: any,
  context?: ExpressContext
): Promise<any> => {
  const requestData = {
    ...(args || {}),
    file: context?.req?.file,
    files: context?.req?.files,
    userId: context?.req?.userId,
  }

  const httpResponse = await controller.handle(requestData)

  switch (httpResponse.statusCode) {
    case 200:
    case 204:
      return httpResponse.body
    case 400:
      throw new UserInputError(httpResponse.body.error)
    case 401:
      throw new AuthenticationError(httpResponse.body.error)
    case 403:
      throw new ForbiddenError(httpResponse.body.error)
    default:
      throw new ApolloError(httpResponse.body.error)
  }
}
