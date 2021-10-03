import { Either, left, right } from '@core/logic/Either'

import { InvalidBioLengthError } from './errors/InvalidBioError'

export class Bio {
  private readonly bio: string

  get value(): string {
    return this.bio
  }

  private constructor(bio: string) {
    this.bio = bio
  }

  static validate(bio: string): boolean {
    if (bio && (bio.trim().length < 3 || bio.trim().length > 150)) {
      return false
    }

    return true
  }

  static create(bio: string): Either<InvalidBioLengthError, Bio> {
    if (!this.validate(bio)) {
      return left(new InvalidBioLengthError())
    }

    return right(new Bio(bio))
  }
}
