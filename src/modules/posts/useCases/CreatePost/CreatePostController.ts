import { FileUpload } from 'graphql-upload'

import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { CreatePost } from './CreatePost'

export type CreatePostControllerRequest = {
  userId: string
  content: string
  media?: [Promise<FileUpload>]
  replyForPostId?: string
  repostForPostId?: string
}

export class CreatePostController implements Controller {
  constructor(private createPost: CreatePost) {}

  async handle({
    userId,
    content,
    media,
    replyForPostId,
    repostForPostId,
  }: CreatePostControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.createPost.execute({
        authorId: userId,
        content,
        media,
        replyForPostId,
        repostForPostId,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          default:
            return clientError(error)
        }
      } else {
        return ok({ ...result.value })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
