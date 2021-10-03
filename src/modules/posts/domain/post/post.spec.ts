import { Content } from './content'
import { Post } from './post'

const content = Content.create('New post').value as Content

describe('Post model', () => {
  it('should be able to create new post', () => {
    const postOrError = Post.create({
      content,
      authorId: '123',
      replyForPostId: '123',
    })

    expect(postOrError.isRight()).toBeTruthy()
  })
})
