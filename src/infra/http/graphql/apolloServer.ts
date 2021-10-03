import { ApolloServer } from 'apollo-server-express'
import { GraphQLResponse } from 'apollo-server-types'
import { Express } from 'express'
import { GraphQLError } from 'graphql'
import { graphqlUploadExpress } from 'graphql-upload'

import { makeExecutableSchema } from '@graphql-tools/schema'

import { authDirectiveTransformer } from './directives/AuthDirective'
import resolvers from './resolvers'
import typeDefs from './typeDefs'

const checkError = (error: GraphQLError, errorName: string): boolean => {
  return [error.name, error.originalError?.name].some(
    name => name === errorName
  )
}

const handleErrors = (
  response: GraphQLResponse,
  errors: readonly GraphQLError[]
): void => {
  errors?.forEach(error => {
    response.data = undefined
    if (checkError(error, 'UserInputError')) {
      response.http.status = 400
    } else if (checkError(error, 'AuthenticationError')) {
      response.http.status = 401
    } else if (checkError(error, 'ForbiddenError')) {
      response.http.status = 403
    } else {
      response.http.status = 500
    }
  })
}

let schema = makeExecutableSchema({ resolvers, typeDefs })

schema = authDirectiveTransformer(schema)

export const apolloServer = async (app: Express) => {
  const server = new ApolloServer({
    schema,
    context: ({ req }) => ({ req }),
    plugins: [
      {
        requestDidStart: async () => ({
          willSendResponse: async ({ response, errors }) =>
            handleErrors(response, errors),
        }),
      },
    ],
  })

  app.use(graphqlUploadExpress())

  await server.start()

  server.applyMiddleware({ app })
}
