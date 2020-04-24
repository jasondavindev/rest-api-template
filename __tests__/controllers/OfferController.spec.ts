import { Application } from 'express'
import faker from 'faker'
import { OK, NOT_FOUND, CREATED, BAD_REQUEST, NO_CONTENT } from 'http-status-codes'
import request from 'supertest'
import { cleanTables, populateOfferTable, createOffer, buildOffer } from 'test/factories'
import { Connection, UpdateResult } from 'typeorm'

import { Offer } from '@/database/models'
import ExpressLoader from '@/loaders/ExpressLoader'
import TypeormLoader from '@/loaders/TypeormLoader'

import { FusionAuthMiddleware } from '~/middlewares'
import { OfferService } from '~/services'

const resourcePath = (id?: number) => (id ? `/api/v1/offers/${id}` : '/api/v1/offers')

describe('/api/v1/offers', () => {
  let app: Application
  let connection: Connection

  beforeAll(async () => {
    app = ExpressLoader()
    connection = await TypeormLoader()

    FusionAuthMiddleware.prototype.use = jest.fn(async (req, res, next) => next())
  })

  afterAll(async () => {
    await connection.close()
  })

  afterEach(async () => {
    await cleanTables(connection, [Offer])
  })

  describe('GET /:id', () => {
    describe('when offer exists', () => {
      it('returns OK', async () => {
        const [offer] = await populateOfferTable(1)

        await request(app).get(resourcePath(offer.id)).expect(OK)
      })
    })

    describe('when offer not exists', () => {
      it('returns NOT_FOUND', async () => {
        await request(app).get(resourcePath(faker.random.number())).expect(NOT_FOUND)
      })
    })
  })

  describe('POST /', () => {
    describe('when offer was created', () => {
      it('returns CREATED', async () => {
        const offer = await buildOffer()
        await request(app).post(resourcePath()).send({ offer }).expect(CREATED)
      })
    })

    describe('when offer was not created', () => {
      it('returns BAD_REQUEST', async () => {
        jest.spyOn(OfferService.prototype, 'create').mockResolvedValue(undefined)

        const offer = createOffer()
        await request(app).post(resourcePath()).send({ offer }).expect(BAD_REQUEST)
      })
    })
  })

  describe('PATCH /:id', () => {
    describe('when offer not exists', () => {
      it('returns NOT_FOUND', async () => {
        await request(app)
          .patch(`${resourcePath(faker.random.number())}/decrement`)
          .expect(NOT_FOUND)
      })
    })

    describe('when offer was updated', () => {
      it('returns OK', async () => {
        const [offer] = await populateOfferTable(1, { seats: 1 } as Offer)
        await request(app)
          .patch(`${resourcePath(offer.id)}/decrement`)
          .expect(OK)
      })
    })

    describe('when offer was not updated', () => {
      it('returns BAD_REQUEST', async () => {
        jest
          .spyOn(OfferService.prototype, 'update')
          .mockResolvedValue({ affected: 0 } as UpdateResult)
        const [offer] = await populateOfferTable(1, { seats: 1 } as Offer)

        await request(app)
          .patch(`${resourcePath(offer.id)}/decrement`)
          .expect(BAD_REQUEST)
      })
    })
  })

  describe('DELETE /:id', () => {
    describe('when offer exists', () => {
      describe('and offer was deleted', () => {
        it('returns NO_CONTENT', async () => {
          const [offer] = await populateOfferTable(1)

          await request(app).delete(resourcePath(offer.id)).expect(NO_CONTENT)
        })
      })

      describe('and offer has deleted_at', () => {
        it('returns NOT_FOUND', async () => {
          const [offer] = await populateOfferTable(1)
          offer.deletedAt = new Date()
          await connection.getRepository(Offer).save(offer)

          await request(app).delete(resourcePath(offer.id)).expect(NOT_FOUND)
        })
      })
    })

    describe('when offer not exists', () => {
      it('returns NOT_FOUND', async () => {
        await request(app).delete(resourcePath(faker.random.number())).expect(NOT_FOUND)
      })
    })
  })
})
