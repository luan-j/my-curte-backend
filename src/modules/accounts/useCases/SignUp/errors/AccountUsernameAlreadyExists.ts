import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class AccountUsernameAlreadyExistsError
  extends Error
  implements UseCaseError
{
  constructor(username: string) {
    super(`The username "${username}" is already registered.`)
    this.name = 'AccountUsernameAlreadyExistsError'
  }
}
