/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest'
import { v4 as uuid } from 'uuid'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'
import { JWT } from '@modules/accounts/domain/user/jwt'
import { User } from '@modules/accounts/domain/user/user'
import { User as PersistenceUser } from '@prisma/client'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

let user: PersistenceUser
let userJwt: {
  user: User
  jwt: JWT
}

const params = {
  username: 'johnOfc',
  name: 'John Doe',
  email: 'john@doe.com',
  password: '123456',
}

describe('Create User Follow (e2e)', () => {
  beforeAll(async () => {
    userJwt = createAndAuthenticateUser()

    user = await prisma.user.create({
      data: { ...params, id: userJwt.jwt.userId },
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to create user follow', async () => {
    const user2 = await prisma.user.create({
      data: {
        ...params,
        id: uuid(),
        username: 'johnOfc2',
        email: 'john2@doe.com',
      },
    })

    const response = await request(app)
      .post('/users/follow')
      .set('x-access-token', userJwt.jwt.token)
      .send({
        toFollowUserId: user2.id,
      })

    expect(response.status).toBe(200)

    const followInDatabase = await prisma.follow.findFirst({
      where: {
        user_id: user.id,
        following_id: user2.id,
      },
    })

    expect(followInDatabase).toBeTruthy()
  })

  it('should not be able to create inexistent user follow', async () => {
    const response = await request(app)
      .post('/users/follow')
      .set('x-access-token', userJwt.jwt.token)
      .send({
        toFollowUserId: 'fake-following-id',
      })

    expect(response.status).toBe(400)
  })
})
