import { EntityRepository, Repository } from 'typeorm'

import { Offer } from '@/database/models'

@EntityRepository(Offer)
export default class OfferRepository extends Repository<Offer> {}
