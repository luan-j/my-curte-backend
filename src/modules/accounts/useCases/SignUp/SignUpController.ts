import { Controller } from '@core/infra/Controller'
import {
  clientError,
  conflict,
  fail,
  HttpResponse,
  ok,
} from '@core/infra/HttpResponse'
import { Validator } from '@core/infra/Validator'

import { SignIn } from '../SignIn/SignIn'
import { AccountEmailAlreadyExistsError } from './errors/AccountEmailAlreadyExistsError'
import { AccountUsernameAlreadyExistsError } from './errors/AccountUsernameAlreadyExists'
import { SignUp } from './SignUp'

export type SignUpControllerRequest = {
  username: string
  name: string
  email: string
  password: string
  password_confirmation: string
}

export class SignUpController implements Controller {
  constructor(
    private readonly validator: Validator<SignUpControllerRequest>,
    private signUpUser: SignUp,
    private signInUser: SignIn
  ) {}

  async handle(request: SignUpControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate(request)

      if (validationResult.isLeft()) {
        return clientError(validationResult.value)
      }

      const { username, name, email, password } = request

      const result = await this.signUpUser.execute({
        username,
        name,
        email,
        password,
      })

      const authenticationUser = await this.signInUser.execute({
        email,
        password,
      })

      if (result.isLeft()) {
        const error = result.value

        switch (error.constructor) {
          case AccountEmailAlreadyExistsError:
            return conflict(error)
          case AccountUsernameAlreadyExistsError:
            return conflict(error)
          default:
            return clientError(error)
        }
      } else if (authenticationUser.isRight()) {
        const { accessToken } = authenticationUser.value

        return ok({ accessToken })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
