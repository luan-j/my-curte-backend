import { createUser } from '@test/factories/UserFactory'

import { InMemoryUsersRepository } from '../../repositories/in-memory/InMemoryUsersRepository'
import { IUsersRepository } from '../../repositories/IUsersRepository'
import { AccountEmailAlreadyExistsError } from './errors/AccountEmailAlreadyExistsError'
import { SignUp } from './SignUp'

let usersRepository: IUsersRepository
let registerUser: SignUp

const defaultParams = {
  username: 'johnOfc',
  name: 'John Doe',
  email: 'john@doe.com',
  password: '123456',
}

describe('Sign Up', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    registerUser = new SignUp(usersRepository)
  })

  it('should be able to register new user', async () => {
    const response = await registerUser.execute(defaultParams)

    expect(await usersRepository.emailExists('john@doe.com')).toBeTruthy()
    expect(await usersRepository.usernameExists('johnOfc')).toBeTruthy()
    expect(response.isRight()).toBeTruthy()
  })

  it('should not be able to register new user with invalid data', async () => {
    const response = await registerUser.execute({
      ...defaultParams,
      password: '123',
    })

    expect(response.isLeft()).toBeTruthy()
  })

  it('should not be able to register new user with existing email', async () => {
    const user = createUser({
      email: 'john@doe.com',
    })

    usersRepository.create(user)

    const response = await registerUser.execute(defaultParams)

    expect(response.isLeft()).toBeTruthy()
    expect(response.value).toEqual(
      new AccountEmailAlreadyExistsError('john@doe.com')
    )
  })
})
