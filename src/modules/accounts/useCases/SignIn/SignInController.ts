import { Controller } from '@core/infra/Controller'
import { HttpResponse, ok, fail, clientError } from '@core/infra/HttpResponse'
import { Validator } from '@core/infra/Validator'

import { SignIn } from './SignIn'

export type SignInControllerRequest = {
  email: string
  password: string
}

export class SignInController implements Controller {
  constructor(
    private readonly validator: Validator<SignInControllerRequest>,
    private signIn: SignIn
  ) {}

  async handle({
    email,
    password,
  }: SignInControllerRequest): Promise<HttpResponse> {
    try {
      const validationResult = this.validator.validate({
        email,
        password,
      })

      if (validationResult.isLeft()) {
        return clientError(validationResult.value)
      }

      const result = await this.signIn.execute({
        email,
        password,
      })

      if (result.isLeft()) {
        const error = result.value

        return clientError(error)
      } else {
        const { accessToken } = result.value

        return ok({ accessToken })
      }
    } catch (err) {
      return fail(err)
    }
  }
}
