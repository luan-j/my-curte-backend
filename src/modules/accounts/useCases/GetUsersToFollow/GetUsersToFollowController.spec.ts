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

describe('Get Users To Follow (e2e)', () => {
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

    await prisma.user.createMany({
      data: [
        {
          id: uuid(),
          email: 'johndoe2@example.com',
          name: 'John Doe 2',
          username: 'johnOfc2',
          password: '123456',
        },
        {
          id: uuid(),
          email: 'johndoe3@example.com',
          name: 'John Doe 3',
          username: 'johnOfc3',
          password: '123456',
        },
      ],
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to get users to follow', async () => {
    const email = 'johndoe3@example.com'

    const johnDoeUser = createUser({
      email,
    })

    const { token } = JWT.signUser(johnDoeUser)

    const response = await request(app)
      .get('/users/recommendations')
      .set('x-access-token', token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(3)
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          username: 'johnOfc2',
        }),
      ])
    )
  })

  it('should not be able to get users to follow who already is followed', async () => {
    const email = 'johndoe4@example.com'

    const johnDoeUser = createUser({
      email,
    })

    const johnDoe = await prisma.user.create({
      data: {
        id: johnDoeUser.id,
        name: 'John Doe 4',
        username: 'johnOfc4',
        email,
        password: '123456',
      },
    })

    await prisma.follow.create({
      data: {
        id: uuid(),
        user_id: johnDoe.id,
        following_id: user.id,
      },
    })

    const { token } = JWT.signUser(johnDoeUser)

    const response = await request(app)
      .get('/users/recommendations')
      .set('x-access-token', token)
      .send()

    expect(response.status).toBe(200)
    expect(response.body.length).toBe(2)
  })
})
