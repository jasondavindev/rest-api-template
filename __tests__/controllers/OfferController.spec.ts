import request from 'supertest'
import { getRepository } from 'typeorm'

import Offer from '@/database/models/Offer'

import { bootstrapApp, BootstrapSettings } from '../utils/bootstrap'

describe('/api/v1/offers', () => {
  let settings: BootstrapSettings
  beforeAll(async () => {
    settings = await bootstrapApp()
  })
  afterAll(async () => {
    await settings.connection.close()
  })
  afterEach(async () => getRepository(Offer).delete({}))

  // -------------------------------------------------------------------------
  // Test cases
  // -------------------------------------------------------------------------

  it('GET: /1 returns 404', async () => {
    await request(settings.app)
      .get('/api/v1/offers/1')
      .expect(404)
  })

  it('POST / return 201', async () => {
    await request(settings.app)
      .post('/api/v1/offers')
      .send({
        seats: 10
      } as Offer)
      .expect('Content-Type', /json/)
      .expect(201)
  })
})
