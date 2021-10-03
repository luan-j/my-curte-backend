import { Post } from '@modules/posts/domain/post/post'
import { PostWithDetails } from '@modules/posts/dtos/PostWithDetails'

import { IPostsRepository, PostsFindManyByIdParams } from '../IPostsRepository'

export class InMemoryPostsRepository implements IPostsRepository {
  constructor(public items: Post[] = []) {}

  async findById(id: string): Promise<Post> {
    return this.items.find(post => post.id === id)
  }

  async findManyByAuthorIdWithDetails({
    ids,
    page,
    perPage,
  }: PostsFindManyByIdParams): Promise<PostWithDetails[]> {
    const posts = this.items.filter(post => ids.includes(post.authorId))

    return posts.slice((page - 1) * perPage, page * perPage).map(post => ({
      id: post.id,
      content: post.content.value,
      imageSourceUrl: post.mediaSourceUrl,
      author: {
        id: post.authorId,
        name: 'John Doe',
        username: 'johnOfc',
      },
      totalLikes: 0,
      createdAt: new Date(),
    }))
  }

  async create(post: Post): Promise<PostWithDetails> {
    this.items.push(post)

    return {
      id: post.id,
      content: post.props.content.value,
      author: {
        id: 'author-id',
        name: 'author-name',
        username: 'author',
      },
      totalLikes: 0,
      createdAt: new Date(),
    }
  }
}
