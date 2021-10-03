import * as yup from 'yup'

import { Validator } from '@core/infra/Validator'
import { Either, left, right } from '@core/logic/Either'

import { SignUpControllerRequest } from '../useCases/SignUp/SignUpController'

type Params = SignUpControllerRequest

export class SignUpValidator implements Validator<Params> {
  public validate(data: Params): Either<Error, null> {
    try {
      const schema: yup.SchemaOf<Params> = yup.object({
        username: yup.string().required().trim().min(4).max(15),
        name: yup.string().required().trim().min(3).max(50),
        email: yup.string().required().trim().email(),
        password: yup.string().required().trim().min(6).max(255),
        password_confirmation: yup
          .string()
          .required()
          .trim()
          .test('invalid_password_comparison', p => p === data.password),
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
