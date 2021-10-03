import { IFollowsRepository } from '@modules/accounts/repositories/IFollowsRepository'
import { InMemoryFollowsRepository } from '@modules/accounts/repositories/in-memory/InMemoryFollowsRepository'
import { InMemoryUsersRepository } from '@modules/accounts/repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '@modules/accounts/repositories/IUsersRepository'
import { createUser } from '@test/factories/UserFactory'

import { CreateUserFollow } from './CreateUserFollow'
import { AccountIdNotExistsError } from './errors/AccountIdNotExistsError'

let usersRepository: IUsersRepository
let followsRepository: IFollowsRepository
let createUserFollow: CreateUserFollow

describe('Create User Follow', () => {
  beforeEach(() => {
    followsRepository = new InMemoryFollowsRepository()
    usersRepository = new InMemoryUsersRepository()
    createUserFollow = new CreateUserFollow(usersRepository, followsRepository)
  })

  it('should be able to create user follow', async () => {
    const user1 = createUser()
    const user2 = createUser({
      name: 'John Doe 2',
      username: 'johnDoe2',
    })

    await usersRepository.create(user1)

    await usersRepository.create(user2)

    const response = await createUserFollow.execute({
      userId: user1.id,
      toFollowUserId: user2.id,
    })

    expect(response.isRight()).toBeTruthy()
    expect(
      await followsRepository.followExists({
        userId: user1.id,
        toFollowId: user2.id,
      })
    ).toBeTruthy()
  })

  it('should not be able to create inexistent user follow', async () => {
    const user = createUser()

    await usersRepository.create(user)

    const response = await createUserFollow.execute({
      userId: user.id,
      toFollowUserId: 'fake-following-id',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(
      new AccountIdNotExistsError('fake-following-id')
    )
  })
})
