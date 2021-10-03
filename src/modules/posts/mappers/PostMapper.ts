import { SocialPost } from '@prisma/client'

import { Content } from '../domain/post/content'
import { Post } from '../domain/post/post'

export class PostMapper {
  static toDomain(raw: SocialPost): Post {
    const contentOrError = Content.create(raw.content)

    if (contentOrError.isLeft()) {
      throw new Error('Content value is invalid.')
    }

    const postOrError = Post.create(
      {
        authorId: raw.author_id,
        content: contentOrError.value,
        mediaSourceUrl: raw.media_source_url,
        replyForPostId: raw.reply_for_post_id,
        repostForPostId: raw.repost_for_post_id,
      },
      raw.id
    )

    if (postOrError.isRight()) {
      return postOrError.value
    }

    return null
  }

  static toPersistence(post: Post) {
    return {
      id: post.id,
      author_id: post.authorId,
      content: post.content.value,
      media_source_url: post.mediaSourceUrl,
      reply_for_post_id: post.replyForPostId,
      repost_for_post_id: post.repostForPostId,
    }
  }
}
