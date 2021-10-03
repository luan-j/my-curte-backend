import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidMediaLengthError extends Error implements DomainError {
  constructor() {
    super(`Could not upload more than 5 files per post.`)
    this.name = 'InvalidMediaLengthError'
  }
}
