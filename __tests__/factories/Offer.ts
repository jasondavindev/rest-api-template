import faker from 'faker'
import { getRepository } from 'typeorm'

import { Offer } from '@/database/models'

export const createOffer = (data?: Offer) => {
  const offer = new Offer({
    seats: faker.random.number()
  } as Offer)

  Object.assign(offer, data)
  return offer
}

export const populateOfferTable = (qty: number, data?: Offer) => {
  const offers = Array(qty).fill(data).map(createOffer)

  return getRepository(Offer).save(offers)
}
