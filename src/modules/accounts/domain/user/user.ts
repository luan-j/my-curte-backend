import { Entity } from '@core/domain/Entity'
import { Either, right } from '@core/logic/Either'

import { Bio } from './bio'
import { Email } from './email'
import { InvalidEmailError } from './errors/InvalidEmailError'
import { InvalidNameError } from './errors/InvalidNameError'
import { InvalidPasswordLengthError } from './errors/InvalidPasswordLengthError'
import { InvalidUsernameLengthError } from './errors/InvalidUsernameLengthError'
import { Name } from './name'
import { Password } from './password'
import { Username } from './username'

export interface IUserProps {
  username: Username
  name: Name
  email: Email
  bio?: Bio
  avatarSourceUrl?: string
  coverSourceUrl?: string
  password: Password
  createdAt?: Date
}

export class User extends Entity<IUserProps> {
  get username() {
    return this.props.username
  }

  get name() {
    return this.props.name
  }

  get email() {
    return this.props.email
  }

  get bio() {
    return this.props.bio
  }

  get avatarSourceUrl() {
    return this.props.avatarSourceUrl
  }

  get coverSourceUrl() {
    return this.props.coverSourceUrl
  }

  get password() {
    return this.props.password
  }

  get createdAt() {
    return this.props.createdAt
  }

  private constructor(props: IUserProps, id?: string) {
    super(props, id)
  }

  static create(
    props: IUserProps,
    id?: string
  ): Either<
    | InvalidNameError
    | InvalidEmailError
    | InvalidPasswordLengthError
    | InvalidUsernameLengthError,
    User
  > {
    const user = new User(props, id)

    return right(user)
  }
}
