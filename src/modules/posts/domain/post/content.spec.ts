import { Content } from './content'

describe('Content value object', () => {
  it('should accept valid content', () => {
    const usernameOrError = Content.create('A valid content body')

    expect(usernameOrError.isRight()).toBeTruthy()
  })

  it('should reject invalid content', () => {
    const usernameOrError1 = Content.create('.')

    expect(usernameOrError1.isLeft()).toBeTruthy()
  })

  it('should reject username with more than 300 characters', () => {
    const domain = 'c'.repeat(301)
    const usernameOrError = Content.create(domain)

    expect(usernameOrError.isLeft()).toBeTruthy()
  })
})
