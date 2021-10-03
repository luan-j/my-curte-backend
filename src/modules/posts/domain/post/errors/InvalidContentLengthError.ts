import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidContentLengthError extends Error implements DomainError {
  constructor() {
    super(`The content must have between 5 and 300 characters.`)
    this.name = 'InvalidContentLengthError'
  }
}
