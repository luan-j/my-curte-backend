import { Either, left, right } from '@core/logic/Either'
import { Email } from '@modules/accounts/domain/user/email'
import { Password } from '@modules/accounts/domain/user/password'

import { JWT } from '../../domain/user/jwt'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'

type TokenResponse = {
  accessToken: string
}

type SignInRequest = {
  email: string
  password: string
}

type SignInResponse = Either<InvalidEmailOrPasswordError, TokenResponse>

export class SignIn {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({ email, password }: SignInRequest): Promise<SignInResponse> {
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new InvalidEmailOrPasswordError())
    }

    const isPasswordValid = await user.password.comparePassword(password)

    if (!isPasswordValid) {
      return left(new InvalidEmailOrPasswordError())
    }

    const { token } = JWT.signUser(user)

    return right({ accessToken: token })
  }
}
