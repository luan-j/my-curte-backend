import { adaptResolver } from '@core/infra/adapters/ApolloServerResolverAdapter'
import { makeSignInController } from '@infra/http/factories/controllers/Authentication/SignInControllerFactory'
import { makeSignUpController } from '@infra/http/factories/controllers/Authentication/SignUpControllerFactory'

export const authenticationResolver = {
  Query: {
    signIn: async (_: any, args: any) =>
      adaptResolver(makeSignInController(), args),
  },

  Mutation: {
    signUp: async (_: any, args: any) =>
      adaptResolver(makeSignUpController(), args),
  },
}
