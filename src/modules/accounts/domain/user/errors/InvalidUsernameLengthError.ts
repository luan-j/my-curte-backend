import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidUsernameLengthError extends Error implements DomainError {
  constructor() {
    super(`The username must have between 4 and 15 characters.`)
    this.name = 'InvalidUsernameLengthError'
  }
}
