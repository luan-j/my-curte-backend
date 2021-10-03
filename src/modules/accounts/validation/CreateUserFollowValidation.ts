import type { SchemaOf } from 'yup'
import * as yup from 'yup'

import { Validator } from '@core/infra/Validator'
import { Either, left, right } from '@core/logic/Either'

import { CreateUserFollowControllerRequest } from '../useCases/CreateUserFollow/CreateUserFollowController'

type Params = CreateUserFollowControllerRequest

export class CreateUserFollowValidator implements Validator<Params> {
  validate(data: Params): Either<Error, null> {
    try {
      const schema: SchemaOf<Params> = yup.object({
        toFollowUserId: yup.string().required(),
        userId: yup.string().required(),
      })

      schema.validateSync(data)

      return right(null)
    } catch (error) {
      if (yup.ValidationError.isError(error)) {
        return left(error)
      }

      throw error
    }
  }
}
