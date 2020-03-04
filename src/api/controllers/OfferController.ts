import { JsonController, Put, Param, NotFoundError, Get } from 'routing-controllers'
import { Container } from 'typedi'

import { OfferService } from '~/services/OfferService'

@JsonController('/v1/offers')
export default class OfferController {
  constructor(private offerService: OfferService) {
    this.offerService = Container.get(OfferService)
  }

  @Get('/:id')
  async index(@Param('id') id: number) {
    return this.offerService.findOne(id)
  }

  @Put('/:id/decrement')
  async decrement(@Param('id') id: number) {
    const offer = await this.offerService.findOne(id)

    if (!offer) {
      throw new NotFoundError('Offer not found')
    }

    offer.decrement()
    await this.offerService.update(offer.id, offer)

    return offer
  }
}
