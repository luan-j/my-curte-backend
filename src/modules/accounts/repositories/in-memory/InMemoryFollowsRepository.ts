import { Follow } from '@modules/accounts/domain/follow/follow'
import { FollowResponse } from '@modules/accounts/dtos/FollowResponse'

import { FollowExistsParams, IFollowsRepository } from '../IFollowsRepository'

export class InMemoryFollowsRepository implements IFollowsRepository {
  constructor(public items: Follow[] = []) {}

  async followExists({
    userId,
    toFollowId,
  }: FollowExistsParams): Promise<boolean> {
    return this.items.some(
      follow => follow.userId === userId && follow.followingId === toFollowId
    )
  }

  async findManyByUserId(id: string): Promise<Follow[]> {
    return this.items.filter(follow => follow.userId === id)
  }

  async create(follow: Follow): Promise<FollowResponse> {
    this.items.push(follow)

    return follow
  }
}
