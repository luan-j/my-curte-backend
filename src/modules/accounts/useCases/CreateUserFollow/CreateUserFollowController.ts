import { Controller } from '@core/infra/Controller'
import { HttpResponse, fail, clientError, ok } from '@core/infra/HttpResponse'
import { Validator } from '@core/infra/Validator'

import { CreateUserFollow } from './CreateUserFollow'

export type CreateUserFollowControllerRequest = {
  userId: string
  toFollowUserId: string
}

export class CreateUserFollowController implements Controller {
  constructor(
    private readonly validator: Validator<CreateUserFollowControllerRequest>,
    private createUserFollow: CreateUserFollow
  ) {}

  async handle({
    userId,
    toFollowUserId,
  }: CreateUserFollowControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate({
        userId,
        toFollowUserId,
      })

      if (validationResult.isLeft()) {
        return clientError(validationResult.value)
      }

      const result = await this.createUserFollow.execute({
        userId,
        toFollowUserId,
      })

      if (result.isLeft()) {
        const error = result.value

        return clientError(error)
      } else {
        const createdFollow = result.value

        return ok({ ...createdFollow })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
