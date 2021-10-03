import { Either, left, right } from '@core/logic/Either'

import { InvalidUsernameLengthError } from './errors/InvalidUsernameLengthError'

export class Username {
  private readonly username: string

  get value(): string {
    return this.username
  }

  private constructor(username: string) {
    this.username = username
  }

  static validate(username: string): boolean {
    if (
      !username ||
      username.trim().length < 4 ||
      username.trim().length > 15
    ) {
      return false
    }

    const regex = /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/

    if (!regex.test(username)) {
      return false
    }

    return true
  }

  static create(
    username: string
  ): Either<InvalidUsernameLengthError, Username> {
    if (!this.validate(username)) {
      return left(new InvalidUsernameLengthError())
    }

    return right(new Username(username))
  }
}
