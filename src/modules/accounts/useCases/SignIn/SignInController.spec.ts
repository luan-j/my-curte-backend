/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import bcrypt from 'bcryptjs'
import request from 'supertest'
import { v4 as uuid } from 'uuid'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'

describe('Sign In (e2e)', () => {
  beforeAll(async () => {
    await prisma.user.create({
      data: {
        id: uuid(),
        username: 'johnOfc',
        name: 'John Doe',
        email: 'john@doe.com',
        password: await bcrypt.hash('123456', 8),
      },
    })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to authenticate', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.status).toBe(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        accessToken: expect.any(String),
      })
    )
  })

  it('should not be able to authenticate with invalid credentials', async () => {
    const response = await request(app).post('/sessions').send({
      email: 'john@doe.com',
      password: '12345',
    })

    expect(response.status).toBe(400)
  })
})
