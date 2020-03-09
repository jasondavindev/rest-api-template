import { Service } from 'typedi'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Offer } from '@/database/models/Offer'

import { OfferRepository } from '~/repositories/OfferRepository'

@Service()
export class OfferService {
  constructor(@OrmRepository() private offerRepository: OfferRepository) {}

  public async find(): Promise<Offer[]> {
    return this.offerRepository.find()
  }

  public async findOne(id: number): Promise<Offer | undefined> {
    return this.offerRepository.findOne({ id })
  }

  public async create(offer: Offer): Promise<Offer | undefined> {
    await this.offerRepository.save(offer)
    return offer
  }

  public async update(offerId: number, offer: Offer) {
    Object.assign(offer, { id: offerId })
    return this.offerRepository.save(offer)
  }
}
