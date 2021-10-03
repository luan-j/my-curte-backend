import { UserResponse } from '@modules/accounts/dtos/UserResponse'

import { User } from '../../domain/user/user'
import {
  IUsersRepository,
  UsersFindManyWithNotIdsParams,
} from '../IUsersRepository'

export class InMemoryUsersRepository implements IUsersRepository {
  constructor(public items: User[] = []) {}

  async idExists(id: string): Promise<boolean> {
    return this.items.some(user => user.id === id)
  }

  async emailExists(email: string): Promise<boolean> {
    return this.items.some(user => user.email.value === email)
  }

  async usernameExists(username: string): Promise<boolean> {
    return this.items.some(user => user.username.value === username)
  }

  async findByEmail(email: string): Promise<User> {
    return this.items.find(user => user.email.value === email)
  }

  async save(user: User): Promise<void> {
    const userIndex = this.items.findIndex(findUser => findUser.id === user.id)

    this.items[userIndex] = user
  }

  async findManyWithNotIds({
    ids,
    page,
    perPage,
  }: UsersFindManyWithNotIdsParams): Promise<UserResponse[]> {
    const users = this.items.filter(user => !ids.includes(user.id))

    return users.slice((page - 1) * perPage, page * perPage).map(user => ({
      id: user.id,
      name: user.name.value,
      username: user.username.value,
      email: user.email.value,
      bio: user.bio?.value,
      avatarSourceUrl: user.avatarSourceUrl,
      coverSourceUrl: user.avatarSourceUrl,
      createdAt: user.createdAt,
    }))
  }

  async create(user: User): Promise<void> {
    this.items.push(user)
  }
}
