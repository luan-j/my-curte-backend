import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class InvalidPostError extends Error implements UseCaseError {
  constructor() {
    super(`Post does not exists.`)
    this.name = 'InvalidPostError'
  }
}
