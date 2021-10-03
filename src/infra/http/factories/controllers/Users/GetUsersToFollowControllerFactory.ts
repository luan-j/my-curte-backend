import { Controller } from '@core/infra/Controller'
import { PrismaFollowsRepository } from '@modules/accounts/repositories/prisma/PrismaFollowsRepository'
import { PrismaUsersRepository } from '@modules/accounts/repositories/prisma/PrismaUsersRepository'
import { GetUsersToFollow } from '@modules/accounts/useCases/GetUsersToFollow/GetUsersToFollow'
import { GetUsersToFollowController } from '@modules/accounts/useCases/GetUsersToFollow/GetUsersToFollowController'

export function makeGetUsersToFollowController(): Controller {
  const prismaUsersRepository = new PrismaUsersRepository()
  const prismaFollowsRepository = new PrismaFollowsRepository()
  const getUsersToFollow = new GetUsersToFollow(
    prismaUsersRepository,
    prismaFollowsRepository
  )
  const getUsersToFollowController = new GetUsersToFollowController(
    getUsersToFollow
  )

  return getUsersToFollowController
}
