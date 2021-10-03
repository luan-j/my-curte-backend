import { adaptResolver } from '@core/infra/adapters/ApolloServerResolverAdapter'
import { makeCreateUserFollowController } from '@infra/http/factories/controllers/Users/CreateUserFollowControllerFactory'
import { makeGetUsersToFollowController } from '@infra/http/factories/controllers/Users/GetUsersToFollowControllerFactory'

export const followsResolver = {
  Query: {
    getUsersToFollow: async (_: any, args: any, context: any) =>
      adaptResolver(makeGetUsersToFollowController(), args, context),
  },

  Mutation: {
    createUserFollow: async (_: any, args: any, context: any) =>
      adaptResolver(makeCreateUserFollowController(), args, context),
  },
}
