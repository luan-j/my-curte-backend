import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { PostWithDetails } from '@modules/posts/dtos/PostWithDetails'
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository'

type GetPostsFeedRequest = {
  page?: number
  perPage?: number
  userId: string
}

type GetPostsFeedResponse = PostWithDetails[]

export class GetPostsFeed {
  constructor(
    private postsRepository: IPostsRepository,
    private followsRepository: IFollowsRepository
  ) {}

  async execute({
    page = 1,
    perPage = 7,
    userId,
  }: GetPostsFeedRequest): Promise<GetPostsFeedResponse> {
    const allUserFollowing = await this.followsRepository.findManyByUserId(
      userId
    )

    const authorsFeed = [
      ...allUserFollowing.map(following => following.followingId),
      userId ?? '',
    ]

    const postsWithDetails =
      await this.postsRepository.findManyByAuthorIdWithDetails({
        ids: authorsFeed,
        page,
        perPage,
      })

    return postsWithDetails
  }
}
