import { Service } from 'typedi'
import { FindManyOptions, FindOneOptions, FindConditions } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Offer } from '@/database/models'

import { OfferRepository } from '~/repositories'

@Service()
export default class OfferService {
  constructor(@OrmRepository() private offerRepository: OfferRepository) {}

  public async find(conditions?: FindManyOptions): Promise<Offer[]> {
    return this.offerRepository.find(conditions)
  }

  public async findOne(conditions: FindOneOptions<Offer>): Promise<Offer | undefined> {
    return this.offerRepository.findOne(conditions)
  }

  public async create(offer: Offer): Promise<Offer | undefined> {
    return this.offerRepository.save(offer)
  }

  public async update(conditions: FindConditions<Offer>, offer: Offer) {
    return this.offerRepository.update(conditions, offer)
  }
}
