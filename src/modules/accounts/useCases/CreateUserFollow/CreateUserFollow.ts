import { Either, left, right } from '@core/logic/Either'
import { Follow } from '@modules/accounts/domain/follow/follow'
import { FollowResponse } from '@modules/accounts/dtos/FollowResponse'
import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

import { AccountIdNotExistsError } from './errors/AccountIdNotExistsError'
import { FollowAlreadyExistsError } from './errors/FollowAlreadyExistsError'

type CreateUserFollowRequest = {
  userId: string
  toFollowUserId: string
}

type CreateUserFollowResponse = Either<Error, FollowResponse>

export class CreateUserFollow {
  constructor(
    private usersRepository: IUsersRepository,
    private followsRepository: IFollowsRepository
  ) {}

  async execute({
    userId,
    toFollowUserId,
  }: CreateUserFollowRequest): Promise<CreateUserFollowResponse> {
    const userExists = await this.usersRepository.idExists(toFollowUserId)

    if (!userExists) {
      return left(new AccountIdNotExistsError(toFollowUserId))
    }

    const followExists = await this.followsRepository.followExists({
      userId,
      toFollowId: toFollowUserId,
    })

    if (followExists) {
      return left(new FollowAlreadyExistsError())
    }

    const followOrError = Follow.create({
      userId,
      followingId: toFollowUserId,
    })

    const createdFollow = await this.followsRepository.create(followOrError)

    return right(createdFollow)
  }
}
