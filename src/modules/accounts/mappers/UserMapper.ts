import { User as PersistenceUser } from '@prisma/client'

import { Bio } from '../domain/user/bio'
import { Email } from '../domain/user/email'
import { Name } from '../domain/user/name'
import { Password } from '../domain/user/password'
import { User } from '../domain/user/user'
import { Username } from '../domain/user/username'
import { UserResponse } from '../dtos/UserResponse'

export class UserMapper {
  static toDomain(raw: PersistenceUser): User {
    const usernameOrError = Username.create(raw.username)
    const nameOrError = Name.create(raw.name)
    const emailOrError = Email.create(raw.email)
    const bioOrError = Bio.create(raw.bio)
    const passwordOrError = Password.create(raw.password, true)

    if (nameOrError.isLeft()) {
      throw new Error('Name value is invalid.')
    }

    if (usernameOrError.isLeft()) {
      throw new Error('Username value is invalid.')
    }

    if (emailOrError.isLeft()) {
      throw new Error('Email value is invalid.')
    }

    if (bioOrError.isLeft()) {
      throw new Error('Bio value is invalid.')
    }

    if (passwordOrError.isLeft()) {
      throw new Error('Password value is invalid.')
    }

    const userOrError = User.create(
      {
        username: usernameOrError.value,
        name: nameOrError.value,
        email: emailOrError.value,
        bio: bioOrError.value,
        avatarSourceUrl: raw.avatar_source_url,
        coverSourceUrl: raw.cover_source_url,
        password: passwordOrError.value,
        createdAt: raw.created_at,
      },
      raw.id
    )

    if (userOrError.isRight()) {
      return userOrError.value
    }

    return null
  }

  static toDto(raw: PersistenceUser): UserResponse {
    return {
      id: raw.id,
      name: raw.name,
      username: raw.username,
      email: raw.email,
      bio: raw.bio,
      avatarSourceUrl: raw.avatar_source_url,
      coverSourceUrl: raw.cover_source_url,
      createdAt: raw.created_at,
    }
  }

  static async toPersistence(user: User) {
    return {
      id: user.id,
      username: user.username.value,
      name: user.name.value,
      email: user.email.value,
      password: await user.password.getHashedValue(),
    }
  }
}
