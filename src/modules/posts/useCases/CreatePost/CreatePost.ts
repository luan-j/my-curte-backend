import { FileUpload } from 'graphql-upload'

import { Either, left, right } from '@core/logic/Either'
import { IStorageProvider } from '@infra/providers/models/IStorageProvider'
import { Content } from '@modules/posts/domain/post/content'
import { Post } from '@modules/posts/domain/post/post'
import { PostWithDetails } from '@modules/posts/dtos/PostWithDetails'
import { PrismaPostsRepository } from '@modules/posts/repositories/prisma/PrismaPostsRepository'

import { InvalidMediaLengthError } from './errors/InvalidMediaLengthError'
import { InvalidPostError } from './errors/InvalidPostError'

type CreatePostRequest = {
  authorId: string
  content: string
  media?: [Promise<FileUpload>]
  replyForPostId?: string
  repostForPostId?: string
}

type CreatePostResponse = Either<Error, PostWithDetails>

export class CreatePost {
  constructor(
    private prismaPostsRepository: PrismaPostsRepository,
    private storageProvider: IStorageProvider
  ) {}

  async execute({
    authorId,
    content,
    media,
    replyForPostId,
    repostForPostId,
  }: CreatePostRequest): Promise<CreatePostResponse> {
    const contentOrError = Content.create(content)

    if (media?.length > 5) {
      return left(new InvalidMediaLengthError())
    }

    if (contentOrError.isLeft()) {
      return left(contentOrError.value)
    }

    if (replyForPostId && repostForPostId) {
      return left(new InvalidPostError())
    } else if (replyForPostId || repostForPostId) {
      const postExists = await this.prismaPostsRepository.findById(
        replyForPostId || repostForPostId
      )

      if (!postExists) {
        return left(new InvalidPostError())
      }
    }

    let uploadedImageUrl: string[] | undefined

    if (media?.length) {
      const promises = media.map(async image => {
        const file = await image

        if (['image/png'].includes(file.mimetype)) {
          const stream = file.createReadStream()

          const imageUrl = await this.storageProvider.uploadMediaStream(stream)

          if (!uploadedImageUrl) {
            uploadedImageUrl = [imageUrl]
          } else {
            uploadedImageUrl.push(imageUrl)
          }
        }
      })

      await Promise.all(promises)
    }

    const postOrError = Post.create({
      authorId: authorId,
      content: contentOrError.value,
      mediaSourceUrl: uploadedImageUrl,
      replyForPostId,
      repostForPostId,
    })

    if (postOrError.isLeft()) {
      return left(postOrError.value)
    }

    const post = postOrError.value

    const createdPost = await this.prismaPostsRepository.create(post)

    return right(createdPost)
  }
}
