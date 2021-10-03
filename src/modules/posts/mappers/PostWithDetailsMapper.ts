import { SocialPost, User } from '@prisma/client'

import { PostWithDetails } from '../dtos/PostWithDetails'

type PersistenceRaw = SocialPost & {
  author: User
  _count: {
    likes: number
  }
}

export class PostWithDetailsMapper {
  static toDto(raw: PersistenceRaw): PostWithDetails {
    return {
      id: raw.id,
      content: raw.content,
      mediaSourceUrl: raw.media_source_url,
      replyForPostId: raw.reply_for_post_id,
      repostForPostId: raw.repost_for_post_id,
      author: {
        id: raw.author.id,
        username: raw.author.username,
        name: raw.author.name,
        avatarSourceUrl: raw.author.avatar_source_url,
      },
      totalLikes: raw._count.likes,
      createdAt: raw.created_at,
    }
  }
}
