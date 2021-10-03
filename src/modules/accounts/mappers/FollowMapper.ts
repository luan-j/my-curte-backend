import { Follow as PersistenceFollow } from '@prisma/client'

import { Follow } from '../domain/follow/follow'
import { FollowResponse } from '../dtos/FollowResponse'

export class FollowMapper {
  static toDomain(raw: PersistenceFollow): Follow {
    const follow = Follow.create(
      {
        userId: raw.user_id,
        followingId: raw.following_id,
      },
      raw.id
    )

    return follow
  }

  static toDto(raw: PersistenceFollow): FollowResponse {
    return {
      userId: raw.user_id,
      followingId: raw.following_id,
    }
  }

  static toPersistence(follow: Follow) {
    return {
      id: follow.id,
      user_id: follow.userId,
      following_id: follow.followingId,
    }
  }
}
