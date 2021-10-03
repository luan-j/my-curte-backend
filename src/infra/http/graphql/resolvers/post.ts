import { adaptResolver } from '@core/infra/adapters/ApolloServerResolverAdapter'
import { makeCreatePostController } from '@infra/http/factories/controllers/Posts/CreatePostControllerFactory'
import { makeGetPostsFeedController } from '@infra/http/factories/controllers/Posts/GetPostsFeedControllerFactory'

export const postResolver = {
  Query: {
    getPostsFeed: async (_: any, args: any, context: any) =>
      adaptResolver(makeGetPostsFeedController(), args, context),
  },

  Mutation: {
    createPost: async (_: any, args: any, context: any) =>
      adaptResolver(makeCreatePostController(), args, context),
  },
}
