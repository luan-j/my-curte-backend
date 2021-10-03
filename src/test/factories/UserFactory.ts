import { Email } from '@modules/accounts/domain/user/email'
import { JWT } from '@modules/accounts/domain/user/jwt'
import { Name } from '@modules/accounts/domain/user/name'
import { Password } from '@modules/accounts/domain/user/password'
import { User } from '@modules/accounts/domain/user/user'
import { Username } from '@modules/accounts/domain/user/username'

type UserOverrides = {
  name?: string
  username?: string
  email?: string
  password?: string
}

export function createUser(overrides?: UserOverrides) {
  const username = Username.create(overrides?.username ?? 'johnOfc')
    .value as Username
  const name = Name.create(overrides?.name ?? 'John Doe').value as Name
  const email = Email.create(overrides?.email ?? 'john@doe.com').value as Email
  const password = Password.create(overrides?.password ?? '123456')
    .value as Password

  const user = User.create({
    username,
    name,
    email,
    password,
  })

  return user.value as User
}

export function createAndAuthenticateUser() {
  const user = createUser()

  const jwt = JWT.signUser(user)

  return {
    user,
    jwt,
  }
}
