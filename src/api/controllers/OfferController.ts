import { Response } from 'express'
import { NOT_FOUND, CREATED, BAD_REQUEST } from 'http-status-codes'
import { JsonController, Put, Param, Get, HttpError, Post, Body, Res } from 'routing-controllers'
import { Container } from 'typedi'

import { Offer } from '@/database/models/Offer'

import { OfferService } from '~/services/OfferService'

@JsonController('/v1/offers')
export default class OfferController {
  constructor(private offerService: OfferService) {
    this.offerService = Container.get(OfferService)
  }

  @Get('/:id')
  async index(@Param('id') id: number) {
    const offer = await this.offerService.findOne(id)

    if (!offer) {
      throw new HttpError(NOT_FOUND, 'Offer not found')
    }
  }

  @Put('/:id/decrement')
  async decrement(@Param('id') id: number) {
    const offer = await this.offerService.findOne(id)

    if (!offer) {
      throw new HttpError(NOT_FOUND, 'Offer not found')
    }

    offer.decrement()
    await this.offerService.update(offer)

    return offer
  }

  @Post('/')
  async create(@Body({ required: true }) offer: Offer, @Res() res: Response) {
    const offerCreateResult = await this.offerService.create(offer)

    if (offerCreateResult) {
      return res.status(CREATED).json(offer)
    }

    throw new HttpError(BAD_REQUEST, 'Offer not created')
  }
}
