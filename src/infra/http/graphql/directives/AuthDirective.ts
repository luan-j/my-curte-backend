import { ForbiddenError } from 'apollo-server-errors'
import { GraphQLSchema } from 'graphql'

import { getDirective, MapperKind, mapSchema } from '@graphql-tools/utils'
import { makeEnsureAuthenticatedMiddleware } from '@infra/http/factories/middlewares/EnsureAuthenticatedMiddlewareFactory'

export const authDirectiveTransformer = (
  schema: GraphQLSchema
): GraphQLSchema => {
  return mapSchema(schema, {
    [MapperKind.OBJECT_FIELD]: fieldConfig => {
      const authDirective = getDirective(schema, fieldConfig, 'auth')

      if (authDirective) {
        const { resolve } = fieldConfig

        fieldConfig.resolve = async (parent, args, context, info) => {
          const request = {
            accessToken: context?.req?.headers?.['x-access-token'],
          }

          const httpResponse = await makeEnsureAuthenticatedMiddleware().handle(
            request
          )

          if (httpResponse && httpResponse.statusCode === 200) {
            Object.assign(context?.req, httpResponse.body)

            return resolve.call(this, parent, args, context, info)
          } else if (httpResponse) {
            throw new ForbiddenError(httpResponse.body.error)
          }
        }
      }

      return fieldConfig
    },
  })
}
