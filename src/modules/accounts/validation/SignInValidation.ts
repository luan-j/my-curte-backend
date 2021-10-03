import type { SchemaOf } from 'yup'
import * as yup from 'yup'

import { Validator } from '@core/infra/Validator'
import { Either, left, right } from '@core/logic/Either'

import { SignInControllerRequest } from '../useCases/SignIn/SignInController'

type Params = SignInControllerRequest

export class SignInValidator implements Validator<Params> {
  validate(data: Params): Either<Error, null> {
    try {
      const schema: SchemaOf<Params> = yup.object({
        email: yup.string().required().trim().email(),
        password: yup.string().required().trim().min(6).max(255),
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
