import { Controller } from '@core/infra/Controller'
import { PrismaFollowsRepository } from '@modules/accounts/repositories/prisma/PrismaFollowsRepository'
import { PrismaPostsRepository } from '@modules/posts/repositories/prisma/PrismaPostsRepository'
import { GetPostsFeed } from '@modules/posts/useCases/GetPostsFeed/GetPostsFeed'
import { GetPostsFeedController } from '@modules/posts/useCases/GetPostsFeed/GetPostsFeedController'

export function makeGetPostsFeedController(): Controller {
  const prismaPostsRepository = new PrismaPostsRepository()
  const prismaFollowsRepository = new PrismaFollowsRepository()
  const getPostsFeed = new GetPostsFeed(
    prismaPostsRepository,
    prismaFollowsRepository
  )
  const getPostsFeedController = new GetPostsFeedController(getPostsFeed)

  return getPostsFeedController
}
