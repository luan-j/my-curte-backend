import { InMemoryStorageProvider } from '@infra/providers/implementations/StorageProvider/in-memory/InMemoryStorageProvider'
import { InMemoryPostsRepository } from '@modules/posts/repositories/in-memory/InMemoryPostsRepository'
import { IPostsRepository } from '@modules/posts/repositories/IPostsRepository'

import { CreatePost } from './CreatePost'

let postsRepository: IPostsRepository
let createPost: CreatePost
let uploadProvider: InMemoryStorageProvider

describe('Create Post', () => {
  beforeEach(() => {
    postsRepository = new InMemoryPostsRepository()
    uploadProvider = new InMemoryStorageProvider()
    createPost = new CreatePost(postsRepository, uploadProvider)
  })

  it('should be able to create a new post', async () => {
    const response = await createPost.execute({
      content: 'Posts need to be large to be posted',
      authorId: 'dsgds',
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    )
  })
})
