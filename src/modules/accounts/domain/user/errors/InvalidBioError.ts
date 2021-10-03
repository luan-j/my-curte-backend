import { DomainError } from '@core/domain/errors/DomainError'

export class InvalidBioLengthError extends Error implements DomainError {
  constructor() {
    super(`The bio must have between 3 and 150 characters.`)
    this.name = 'InvalidBioLengthError'
  }
}
