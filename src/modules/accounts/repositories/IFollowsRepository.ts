import { Follow } from '../domain/follow/follow'
import { FollowResponse } from '../dtos/FollowResponse'

export type FollowExistsParams = {
  userId: string
  toFollowId: string
}

export interface IFollowsRepository {
  followExists(params: FollowExistsParams): Promise<boolean>
  findManyByUserId(id: string): Promise<Follow[]>
  create(follow: Follow): Promise<FollowResponse>
}
