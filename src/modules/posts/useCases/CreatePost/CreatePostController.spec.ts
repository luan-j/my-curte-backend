/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'
import { createAndAuthenticateUser } from '@test/factories/UserFactory'

describe('Create Post (e2e)', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to create new post', async () => {
    const { jwt } = createAndAuthenticateUser()

    await prisma.user.create({
      data: {
        id: jwt.userId,
        username: 'johnOfc',
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'johndoe123',
      },
    })

    const response = await request(app)
      .post('/posts')
      .set('x-access-token', jwt.token)
      .send({
        content: 'New post',
      })

    expect(response.status).toBe(200)

    const postInDatabase = await prisma.socialPost.findUnique({
      where: { id: response.body.id },
    })

    expect(postInDatabase).toBeTruthy()
  })

  it('should return an error if validation fails', async () => {
    const response = await request(app).post('/posts').send({
      content: '1',
    })

    expect(response.status).toBe(403)
  })
})
