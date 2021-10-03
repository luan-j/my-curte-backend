import { Either, right } from '@core/logic/Either'
import { UserResponse } from '@modules/accounts/dtos/UserResponse'
import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'

type GetUsersToFollowRequest = {
  page?: number
  perPage?: number
  userId: string
}

type GetUsersToFollowResponse = Either<Error, UserResponse[]>

export class GetUsersToFollow {
  constructor(
    private usersRepository: IUsersRepository,
    private followsRepository: IFollowsRepository
  ) {}

  async execute({
    page = 1,
    perPage = 5,
    userId,
  }: GetUsersToFollowRequest): Promise<GetUsersToFollowResponse> {
    const allUserFollowing = await this.followsRepository.findManyByUserId(
      userId
    )

    const notUsersToFetch = [
      ...allUserFollowing.map(following => following.followingId),
      userId,
    ]

    const usersToFollow = await this.usersRepository.findManyWithNotIds({
      ids: notUsersToFetch,
      page,
      perPage,
    })

    return right(usersToFollow)
  }
}
