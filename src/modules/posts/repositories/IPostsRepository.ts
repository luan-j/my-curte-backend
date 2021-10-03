import { Post } from '../domain/post/post'
import { PostWithDetails } from '../dtos/PostWithDetails'

export type PostsFindManyByIdParams = {
  ids: string[]
  page: number
  perPage: number
}

export interface IPostsRepository {
  findById(id: string): Promise<Post>
  findManyByAuthorIdWithDetails(
    params: PostsFindManyByIdParams
  ): Promise<PostWithDetails[]>
  create(post: Post): Promise<PostWithDetails>
}
