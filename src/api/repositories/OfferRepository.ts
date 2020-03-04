import { EntityRepository, Repository } from 'typeorm'

import { Offer } from '~/models/Offer'

@EntityRepository(Offer)
export class OfferRepository extends Repository<Offer> {}
