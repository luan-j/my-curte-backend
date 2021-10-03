import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, ok, clientError } from '@core/infra/HttpResponse'

import { GetUsersToFollow } from './GetUsersToFollow'

type GetUsersToFollowControllerRequest = {
  page?: string
  perPage?: string
  userId: string
}

export class GetUsersToFollowController implements Controller {
  constructor(private getUsersToFollow: GetUsersToFollow) {}

  async handle({
    page,
    perPage,
    userId,
  }: GetUsersToFollowControllerRequest): Promise<HttpResponse> {
    try {
      const result = await this.getUsersToFollow.execute({
        page: parseInt(page) ? parseInt(page) : undefined,
        perPage: parseInt(perPage) ? parseInt(perPage) : undefined,
        userId,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          default:
            return clientError(error)
        }
      } else {
        const usersToFollow = result.value

        return ok(usersToFollow)
      }
    } catch (err) {
      return fail(err)
    }
  }
}
