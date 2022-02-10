import request from 'supertest'

import app from '../../src/app'
import * as dbHelper from '../db-helper'

let user = {
  name: 'Kirsi',
  email: 'kirsitrospe@gmail.com',
  password: 'kirsitrospe'
}

async function signup() {
  return await request(app)
    .post('/api/auth/signup')
    .send(user)
}

describe('auth controller', () => {
  beforeAll(async () => {
    await dbHelper.connect()
  })

  afterEach(async () => {
    await dbHelper.clearDatabase()
  })

  afterAll(async () => {
    await dbHelper.closeDatabase()
  })

  it('should register a new user', async () => {
    const res = await signup()
    expect(res.status).toBe(200)
  })

  it('should response with 400 if signup user with missing data', async () => {
    const res = await signup()

    expect(res.status).toBe(400)
  })
})
