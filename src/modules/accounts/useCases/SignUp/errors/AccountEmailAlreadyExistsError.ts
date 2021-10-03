import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AccountEmailAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(email: string) {
    super(`The email "${email}" is already registered.`)
    this.name = 'AccountEmailAlreadyExistsError'
  }
}
