import { prisma } from '@infra/prisma/client'
import { Post } from '@modules/posts/domain/post/post'
import { PostWithDetails } from '@modules/posts/dtos/PostWithDetails'
import { PostMapper } from '@modules/posts/mappers/PostMapper'
import { PostWithDetailsMapper } from '@modules/posts/mappers/PostWithDetailsMapper'

import { IPostsRepository, PostsFindManyByIdParams } from '../IPostsRepository'

export class PrismaPostsRepository implements IPostsRepository {
  async create(post: Post): Promise<PostWithDetails> {
    const data = PostMapper.toPersistence(post)

    const createdPost = await prisma.socialPost.create({
      data,
      select: {
        id: true,
        content: true,
        author_id: true,
        media_source_url: true,
        reply_for_post_id: true,
        repost_for_post_id: true,
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
        updated_at: true,
        created_at: true,
      },
    })

    return PostWithDetailsMapper.toDto(createdPost)
  }

  async findById(id: string): Promise<Post> {
    const post = await prisma.socialPost.findUnique({
      where: { id },
    })

    if (!post) {
      return null
    }

    return PostMapper.toDomain(post)
  }

  async findManyByAuthorIdWithDetails({
    ids,
    page,
    perPage,
  }: PostsFindManyByIdParams): Promise<PostWithDetails[]> {
    const posts = await prisma.socialPost.findMany({
      where: {
        author_id: {
          in: ids,
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
      include: {
        author: true,
        _count: {
          select: {
            likes: true,
          },
        },
      },
    })

    return posts.map(post => PostWithDetailsMapper.toDto(post))
  }
}
