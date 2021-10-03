import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { InMemoryFollowsRepository } from '@modules/accounts/repositories/in-memory/InMemoryFollowsRepository'
import { Content } from '@modules/posts/domain/post/content'
import { Post } from '@modules/posts/domain/post/post'
import { InMemoryPostsRepository } from '@modules/posts/repositories/in-memory/InMemoryPostsRepository'
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository'

import { GetPostsFeed } from './GetPostsFeed'

let postsRepository: IPostsRepository
let followsRepository: IFollowsRepository
let getPostsFeed: GetPostsFeed

describe('Get Posts Feed', () => {
  beforeEach(async () => {
    postsRepository = new InMemoryPostsRepository()
    followsRepository = new InMemoryFollowsRepository()
    getPostsFeed = new GetPostsFeed(postsRepository, followsRepository)

    for (let i = 0; i < 20; i++) {
      const post = Post.create({
        content: Content.create(`post-${i}`).value as Content,
        authorId: 'fake-author-id',
      }).value as Post

      await postsRepository.create(post)
    }
  })

  it('should be able to get posts feed', async () => {
    const response = await getPostsFeed.execute({
      userId: 'fake-author-id',
    })

    expect(response.length).toEqual(7)
  })

  it('should be able to paginate feed posts', async () => {
    let response = await getPostsFeed.execute({
      userId: 'fake-author-id',
      perPage: 10,
    })

    expect(response.length).toEqual(10)

    response = await getPostsFeed.execute({
      userId: 'fake-author-id',
      perPage: 10,
      page: 2,
    })

    expect(response.length).toEqual(10)
    expect(response[0].content).toEqual('post-10')
  })
})
