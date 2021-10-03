import { Either, left, right } from '@core/logic/Either'

import { InvalidContentLengthError } from './errors/InvalidContentLengthError'

export class Content {
  private readonly content: string

  get value(): string {
    return this.content
  }

  private constructor(content: string) {
    this.content = content
  }

  static validate(content: string): boolean {
    if (!content || content.trim().length < 5 || content.trim().length > 300) {
      return false
    }

    return true
  }

  static create(content: string): Either<InvalidContentLengthError, Content> {
    if (!this.validate(content)) {
      return left(new InvalidContentLengthError())
    }

    return right(new Content(content))
  }
}
