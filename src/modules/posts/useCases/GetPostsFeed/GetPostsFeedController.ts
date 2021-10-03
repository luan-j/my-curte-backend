import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok } from '@core/infra/HttpResponse'

import { GetPostsFeed } from './GetPostsFeed'

type GetPostsFeedControllerRequest = {
  page?: string
  perPage?: string
  userId: string
}

export class GetPostsFeedController implements Controller {
  constructor(private getPostsFeed: GetPostsFeed) {}

  async handle({
    page,
    perPage,
    userId,
  }: GetPostsFeedControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getPostsFeed.execute({
        page: parseInt(page) ? parseInt(page) : undefined,
        perPage: parseInt(perPage) ? parseInt(perPage) : undefined,
        userId,
      })

      return ok(result)
    } catch (err) {
      return fail(err)
    }
  }
}
