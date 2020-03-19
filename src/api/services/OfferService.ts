import { Service } from 'typedi'
import { FindManyOptions } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import Offer from '@/database/models/Offer'

import OfferRepository from '~/repositories/OfferRepository'

@Service()
export default class OfferService {
  constructor(@OrmRepository() private offerRepository: OfferRepository) {}

  public async find(options?: FindManyOptions): Promise<Offer[]> {
    return this.offerRepository.find(options)
  }

  public async findOne(id: number): Promise<Offer | undefined> {
    return this.offerRepository.findOne({ id })
  }

  public async create(offer: Offer): Promise<Offer | undefined> {
    await this.offerRepository.save(offer)
    return offer
  }

  public async update(offer: Offer) {
    return this.offerRepository.save(offer)
  }
}
