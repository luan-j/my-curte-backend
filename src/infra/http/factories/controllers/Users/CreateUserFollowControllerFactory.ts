import { Controller } from '@core/infra/Controller'
import { adaptYupValidation } from '@infra/validation/adapters/YupAdapter'
import { PrismaFollowsRepository } from '@modules/accounts/repositories/prisma/PrismaFollowsRepository'
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository'
import { CreateUserFollow } from '@modules/accounts/useCases/CreateUserFollow/CreateUserFollow'
import { CreateUserFollowController } from '@modules/accounts/useCases/CreateUserFollow/CreateUserFollowController'
import { CreateUserFollowValidator } from '@modules/accounts/validation/CreateUserFollowValidation'

export function makeCreateUserFollowController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaFollowsRepository = new PrismaFollowsRepository()

  const createUserFollow = new CreateUserFollow(
    prismaUsersRepository,
    prismaFollowsRepository
  )

  const validator = adaptYupValidation(new CreateUserFollowValidator())

  const createUserFollowController = new CreateUserFollowController(
    validator,
    createUserFollow
  )

  return createUserFollowController
}
