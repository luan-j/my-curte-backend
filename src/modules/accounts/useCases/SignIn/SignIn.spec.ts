import { createUser } from '@test/factories/UserFactory'

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { InvalidEmailOrPasswordError } from './errors/InvalidEmailOrPasswordError'
import { SignIn } from './SignIn'

let usersRepository: IUsersRepository
let authenticateUser: SignIn

describe('Authenticate User', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    authenticateUser = new SignIn(usersRepository)
  })

  it('should be able to authenticate', async () => {
    const user = createUser()

    usersRepository.create(user)

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.value).toEqual(
      expect.objectContaining({ accessToken: expect.any(String) })
    )
    expect(response.isRight()).toBeTruthy()
  })

  it('should not be able to authenticate with invalid e-mail', async () => {
    const response = await authenticateUser.execute({
      email: 'invalid@example.com',
      password: '123456',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })

  it('should not be able to authenticate with invalid password', async () => {
    const user = createUser()

    usersRepository.create(user)

    const response = await authenticateUser.execute({
      email: 'john@doe.com',
      password: 'invalid-password',
    })

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(new InvalidEmailOrPasswordError())
  })
})
