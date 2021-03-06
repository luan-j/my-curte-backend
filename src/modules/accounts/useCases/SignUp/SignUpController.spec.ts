/**
 * @jest-environment ./prisma/prisma-test-environment.js
 */

import request from 'supertest'

import { app } from '@infra/http/app'
import { prisma } from '@infra/prisma/client'

describe('Sign Up (e2e)', () => {
  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should be able to register new user', async () => {
    const response = await request(app).post('/users').send({
      username: 'john',
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
      password_confirmation: '123456',
    })

    expect(response.status).toBe(200)

    const userInDatabase = await prisma.user.findUnique({
      where: { email: 'john@doe.com' },
    })

    expect(userInDatabase).toBeTruthy()
  })

  it('should return an error if validation fails', async () => {
    const response = await request(app).post('/users').send({
      name: 'John Doe',
      email: 'john@doe.com',
      password: '123456',
    })

    expect(response.status).toBe(400)
  })
})
