import { Controller } from '@core/infra/Controller'
import { CloudinaryProvider } from '@infra/providers/implementations/StorageProvider/CloudinaryProvider'
import { PrismaPostsRepository } from '@modules/posts/repositories/prisma/PrismaPostsRepository'
import { CreatePost } from '@modules/posts/useCases/CreatePost/CreatePost'
import { CreatePostController } from '@modules/posts/useCases/CreatePost/CreatePostController'

export function makeCreatePostController(): Controller {
  const cloudinaryProvider = new CloudinaryProvider()

  const prismaPostsRepository = new PrismaPostsRepository()
  const createPost = new CreatePost(prismaPostsRepository, cloudinaryProvider)
  const createPostController = new CreatePostController(createPost)

  return createPostController
}
