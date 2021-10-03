import { User } from '../domain/user/user'
import { UserResponse } from '../dtos/UserResponse'

export type UsersFindManyWithNotIdsParams = {
  ids: string[]
  page: number
  perPage: number
}

export interface IUsersRepository {
  idExists(id: string): Promise<boolean>
  emailExists(email: string): Promise<boolean>
  usernameExists(username: string): Promise<boolean>
  findByEmail(email: string): Promise<User>
  create(user: User): Promise<void>
  findManyWithNotIds(
    params: UsersFindManyWithNotIdsParams
  ): Promise<UserResponse[]>
}
