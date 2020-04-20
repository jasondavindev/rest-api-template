import { Service } from 'typedi'
import { FindManyOptions, FindOneOptions, FindConditions } from 'typeorm'
import { OrmRepository } from 'typeorm-typedi-extensions'

import { Offer } from '@/database/models'

import { OfferRepository } from '~/repositories'

@Service()
export default class OfferService {
  constructor(@OrmRepository() private repository: OfferRepository) {}

  public async find(conditions?: FindManyOptions): Promise<Offer[]> {
    return this.repository.find(conditions)
  }

  public async findOne(
    conditions: FindConditions<Offer> & FindOneOptions<Offer>
  ): Promise<Offer | undefined> {
    return this.repository.findOne(conditions)
  }

  public async create(offer: Offer): Promise<Offer | undefined> {
    return this.repository.save(offer)
  }

  public async update(conditions: FindConditions<Offer>, offer: Offer) {
    return this.repository.update(conditions, offer)
  }

  public async delete(conditions: FindConditions<Offer>) {
    return this.repository.softDelete(conditions)
  }
}
