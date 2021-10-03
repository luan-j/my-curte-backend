import { Username } from './username'

describe('Username value object', () => {
  it('should accept valid username', () => {
    const usernameOrError = Username.create('johnDoe')

    expect(usernameOrError.isRight()).toBeTruthy()
  })

  it('should reject invalid username', () => {
    const usernameOrError1 = Username.create('johndoe@')
    const usernameOrError2 = Username.create('john doe')
    const usernameOrError3 = Username.create('john!doe@')

    expect(usernameOrError1.isLeft()).toBeTruthy()
    expect(usernameOrError2.isLeft()).toBeTruthy()
    expect(usernameOrError3.isLeft()).toBeTruthy()
  })

  it('should reject username with more than 15 characters', () => {
    const domain = 'c'.repeat(16)
    const usernameOrError = Username.create(`johndoe${domain}`)

    expect(usernameOrError.isLeft()).toBeTruthy()
  })
})
