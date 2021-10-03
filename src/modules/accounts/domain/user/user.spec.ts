import { Email } from './email'
import { Name } from './name'
import { Password } from './password'
import { User } from './user'
import { Username } from './username'

const username = Username.create('John_Ofc').value as Username
const name = Name.create('John Doe').value as Name
const email = Email.create('johndoe@example.com').value as Email
const password = Password.create('123456').value as Password

describe('User model', () => {
  it('should be able to create new user', () => {
    const userOrError = User.create({
      username,
      name,
      email,
      password,
    })

    expect(userOrError.isRight()).toBeTruthy()
  })
})
