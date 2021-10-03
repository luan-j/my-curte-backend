import { UseCaseError } from '@core/domain/errors/UseCaseError'

export class FollowAlreadyExistsError extends Error implements UseCaseError {
  constructor() {
    super(`You already follows this user.`)
    this.name = 'FollowAlreadyExistsError'
  }
}
