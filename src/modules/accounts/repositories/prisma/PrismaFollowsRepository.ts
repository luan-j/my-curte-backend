import { prisma } from '@infra/prisma/client'
import { Follow } from '@modules/accounts/domain/follow/follow'
import { FollowResponse } from '@modules/accounts/dtos/FollowResponse'
import { FollowMapper } from '@modules/accounts/mappers/FollowMapper'

import { FollowExistsParams, IFollowsRepository } from '../IFollowsRepository'

export class PrismaFollowsRepository implements IFollowsRepository {
  async followExists({
    userId,
    toFollowId,
  }: FollowExistsParams): Promise<boolean> {
    const follows = await prisma.follow.findFirst({
      where: {
        user_id: userId,
        following_id: toFollowId,
      },
    })

    return !!follows
  }

  async findManyByUserId(id: string): Promise<Follow[]> {
    const follows = await prisma.follow.findMany({
      where: {
        user_id: id,
      },
    })

    return follows.map(follow => FollowMapper.toDomain(follow))
  }

  async create(follow: Follow): Promise<FollowResponse> {
    const data = FollowMapper.toPersistence(follow)

    const createdFollow = await prisma.follow.create({ data })

    return FollowMapper.toDto(createdFollow)
  }
}
