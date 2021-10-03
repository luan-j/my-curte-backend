import { Controller } from '@core/infra/Controller'
import { adaptYupValidation } from '@infra/validation/adapters/YupAdapter'
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository'
import { SignIn } from '@modules/accounts/useCases/SignIn/SignIn'
import { SignUp } from '@modules/accounts/useCases/SignUp/SignUp'
import { SignUpController } from '@modules/accounts/useCases/SignUp/SignUpController'
import { SignUpValidator } from '@modules/accounts/validation/SignUpValidation'

export const makeSignUpController = (): Controller => {
  const prismaUsersRepository = new PrismaUsersRepository()
  const signUpUser = new SignUp(prismaUsersRepository)
  const signInUser = new SignIn(prismaUsersRepository)

  const validator = adaptYupValidation(new SignUpValidator())

  const signUpController = new SignUpController(
    validator,
    signUpUser,
    signInUser
  )

  return signUpController
}
