import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AccountIdNotExistsError extends Error implements UseCaseError {
  constructor(id: string) {
    super(`The account with id "${id}" does not exists.`)
    this.name = 'AccountIdNotExistsError'
  }
}
