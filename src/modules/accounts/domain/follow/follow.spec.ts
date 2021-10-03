import { Follow } from './follow'

describe('User Follow model', () => {
  it('should be able to create new follow', () => {
    const followOrError = Follow.create({
      userId: 'fake-follower-id',
      followingId: 'fake-following-id',
    })

    expect(followOrError.id).toBeTruthy()
  })
})
