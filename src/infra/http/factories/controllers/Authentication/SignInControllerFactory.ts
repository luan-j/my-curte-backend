import { Controller } from '@core/infra/Controller'
import { adaptYupValidation } from '@infra/validation/adapters/YupAdapter'
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository'
import { SignIn } from '@modules/accounts/useCases/SignIn/SignIn'
import { SignInController } from '@modules/accounts/useCases/SignIn/SignInController'
import { SignInValidator } from '@modules/accounts/validation/SignInValidation'

export const makeSignInController = (): Controller => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const signInUser = new SignIn(prismaUsersRepository)

  const validator = adaptYupValidation(new SignInValidator())

  const signInController = new SignInController(validator, signInUser)

  return signInController
}
