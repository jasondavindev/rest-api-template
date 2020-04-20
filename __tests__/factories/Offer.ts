import faker from 'faker'
import { createCourse, populateCourseTable } from 'test/factories'
import { getRepository } from 'typeorm'

import { Offer } from '@/database/models'

export const createOffer = (data?: Offer) => {
  const offer = new Offer({
    seats: faker.random.number(),
    course: createCourse()
  } as Offer)

  Object.assign(offer, data)
  return offer
}

export const buildOffer = async (data?: Offer) => {
  const [course] = await populateCourseTable(1)

  const offer = new Offer({
    seats: faker.random.number(),
    course
  } as Offer)

  Object.assign(offer, data)
  return offer
}

export const populateOfferTable = async (qty: number, data?: Offer) => {
  const offers = await Promise.all(Array(qty).fill(data).map(buildOffer))

  return getRepository(Offer).save(offers)
}
