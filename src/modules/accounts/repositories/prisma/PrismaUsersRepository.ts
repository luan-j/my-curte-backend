import { prisma } from '@infra/prisma/client'
import { User } from '@modules/accounts/domain/user/user'
import { UserResponse } from '@modules/accounts/dtos/UserResponse'
import { UserMapper } from '@modules/accounts/mappers/UserMapper'

import {
  IUsersRepository,
  UsersFindManyWithNotIdsParams,
} from '../IUsersRepository'

export class PrismaUsersRepository implements IUsersRepository {
  async idExists(id: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: { id },
    })

    return !!userExists
  }

  async emailExists(email: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: { email },
    })

    return !!userExists
  }

  async usernameExists(username: string): Promise<boolean> {
    const userExists = await prisma.user.findUnique({
      where: { username },
    })

    return !!userExists
  }

  async findByEmail(email: string): Promise<User> {
    const user = await prisma.user.findUnique({
      where: { email },
    })

    if (!user) {
      return null
    }

    return UserMapper.toDomain(user)
  }

  async findManyWithNotIds({
    ids,
    page,
    perPage,
  }: UsersFindManyWithNotIdsParams): Promise<UserResponse[]> {
    const raw = await prisma.user.findMany({
      where: {
        id: {
          notIn: ids,
        },
      },
      take: perPage,
      skip: (page - 1) * perPage,
    })

    return raw.map(item => UserMapper.toDto(item))
  }

  async create(user: User): Promise<void> {
    const data = await UserMapper.toPersistence(user)

    await prisma.user.create({ data })
  }
}
