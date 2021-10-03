import { Either, left, right } from '@core/logic/Either'
import { Email } from '@modules/accounts/domain/user/email'
import { InvalidEmailError } from '@modules/accounts/domain/user/errors/InvalidEmailError'
import { InvalidNameError } from '@modules/accounts/domain/user/errors/InvalidNameError'
import { InvalidPasswordLengthError } from '@modules/accounts/domain/user/errors/InvalidPasswordLengthError'
import { InvalidUsernameLengthError } from '@modules/accounts/domain/user/errors/InvalidUsernameLengthError'
import { Name } from '@modules/accounts/domain/user/name'
import { Password } from '@modules/accounts/domain/user/password'
import { User } from '@modules/accounts/domain/user/user'
import { Username } from '@modules/accounts/domain/user/username'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { AccountEmailAlreadyExistsError } from './errors/AccountEmailAlreadyExistsError'
import { AccountUsernameAlreadyExistsError } from './errors/AccountUsernameAlreadyExists'

type SignUpRequest = {
  username: string
  name: string
  email: string
  password: string
}

type SignUprResponse = Either<
  | AccountEmailAlreadyExistsError
  | AccountUsernameAlreadyExistsError
  | InvalidUsernameLengthError
  | InvalidNameError
  | InvalidEmailError
  | InvalidPasswordLengthError,
  User
>

export class SignUp {
  constructor(private usersRepository: IUsersRepository) {}

  async execute({
    username,
    name,
    email,
    password,
  }: SignUpRequest): Promise<SignUprResponse> {
    const usernameOrError = Username.create(username)
    const nameOrError = Name.create(name)
    const emailOrError = Email.create(email)
    const passwordOrError = Password.create(password)

    if (usernameOrError.isLeft()) {
      return left(usernameOrError.value)
    }

    if (nameOrError.isLeft()) {
      return left(nameOrError.value)
    }

    if (emailOrError.isLeft()) {
      return left(emailOrError.value)
    }

    if (passwordOrError.isLeft()) {
      return left(passwordOrError.value)
    }

    const userOrError = User.create({
      username: usernameOrError.value,
      name: nameOrError.value,
      email: emailOrError.value,
      password: passwordOrError.value,
    })

    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    const user = userOrError.value

    const userEmailAlreadyExists = await this.usersRepository.emailExists(
      user.email.value
    )

    if (userEmailAlreadyExists) {
      return left(new AccountEmailAlreadyExistsError(user.email.value))
    }

    const usernameAlreadyExists = await this.usersRepository.usernameExists(
      user.username.value
    )

    if (usernameAlreadyExists) {
      return left(new AccountUsernameAlreadyExistsError(user.username.value))
    }

    await this.usersRepository.create(user)

    return right(null)
  }
}
