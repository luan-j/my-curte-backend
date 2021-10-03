/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest'
import { v4 as uuid } from 'uuid'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'
import { JWT } from '@modules/accounts/domain/user/jwt'
import { User } from '@prisma/client'
import { createUser } from '@test/factories/UserFactory'

let user: User

describe('Get Posts Feed (e2e)', () => {
  beforeAll(async () => {
    user = await prisma.user.create({
      data: {
        id: uuid(),
        name: 'John Doe',
        username: 'johnOfc',
        email: 'johndoe@example.com',
        password: '123456',
      },
    })

    await prisma.socialPost.createMany({
      data: [
        {
          id: uuid(),
          content: 'post-1',
          author_id: user.id,
        },
        {
          id: uuid(),
          content: 'post-2',
          author_id: user.id,
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to get posts feed', async () => {
    const email = 'johndoe2@example.com'

    const johnDoeUser = createUser({
      email,
    })

    const johnDoe = await prisma.user.create({
      data: {
        id: johnDoeUser.id,
        name: 'John Doe 2',
        username: 'johnOfc2',
        email,
        password: '123456',
      },
    })

    const { token } = JWT.signUser(johnDoeUser)

    await prisma.follow.create({
      data: {
        id: uuid(),
        user_id: johnDoe.id,
        following_id: user.id,
      },
    })

    const response = await request(app)
      .get('/posts/feed')
      .set('x-access-token', token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          content: 'post-1',
        }),
      ])
    )
  })

  it('should not be able to receive posts feed from user who does not is following', async () => {
    const email = 'johndoe2@example.com'

    const johnDoeUser = createUser({
      email,
    })

    const { token } = JWT.signUser(johnDoeUser)

    const response = await request(app)
      .get('/posts/feed')
      .set('x-access-token', token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(0)
  })
})
