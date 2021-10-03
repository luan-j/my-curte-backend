import { User } from '@modules/accounts/domain/user/user'
import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { InMemoryFollowsRepository } from '@modules/accounts/repositories/in-memory/InMemoryFollowsRepository'
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { createUser } from '@test/factories/UserFactory'

import { GetUsersToFollow } from './GetUsersToFollow'

let usersRepository: IUsersRepository
let followsRepository: IFollowsRepository
let getUsersToFollow: GetUsersToFollow

let user: User

describe('Get Users To Follow', () => {
  beforeEach(async () => {
    usersRepository = new InMemoryUsersRepository()
    followsRepository = new InMemoryFollowsRepository()
    getUsersToFollow = new GetUsersToFollow(usersRepository, followsRepository)

    user = createUser()

    await usersRepository.create(user)

    await usersRepository.create(
      createUser({
        name: 'John Doe 2',
        username: 'johnDoe2',
      })
    )
  })

  it('should be able to get users to follow', async () => {
    const response = await getUsersToFollow.execute({
      userId: user.id,
    })

    expect(response.isRight()).toBeTruthy()
    expect(response.value).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'John Doe 2',
        }),
      ])
    )
  })
})
