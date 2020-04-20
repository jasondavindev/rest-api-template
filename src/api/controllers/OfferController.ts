import { Response } from 'express'
import { NOT_FOUND, CREATED, BAD_REQUEST, NO_CONTENT } from 'http-status-codes'
import {
  JsonController,
  Param,
  Get,
  HttpError,
  Post,
  Res,
  Patch,
  BodyParam,
  Delete,
  QueryParam
} from 'routing-controllers'
import { Container } from 'typedi'
import { getRepository } from 'typeorm'

import { Offer } from '@/database/models'
import { pagination, mountDynamicWhereQueryBuilder } from '@/utils/QueryBuilder'

import { OfferService } from '~/services'

@JsonController('/v1/offers')
export default class OfferController {
  private static readonly DEFAULT_LIMIT_PER_PAGE = 10

  constructor(private service: OfferService) {
    this.service = Container.get(OfferService)
  }

  @Get('/')
  async index(
    @QueryParam('page') page = 1,
    @QueryParam('perPage') perPage: number = OfferController.DEFAULT_LIMIT_PER_PAGE,
    // Params
    @QueryParam('seats') seats: number
  ) {
    let queryBuilder = getRepository(Offer).createQueryBuilder('offer')

    if (perPage > OfferController.DEFAULT_LIMIT_PER_PAGE) throw new HttpError(BAD_REQUEST, 'The limit per page exceeded the limit')

    queryBuilder = mountDynamicWhereQueryBuilder(queryBuilder, {
      'offer.seats': seats
    })

    const [results, total] = await pagination(queryBuilder, page, perPage).getManyAndCount()
    const pages = Math.ceil(total / perPage)

    return {
      total,
      pages,
      results,
      currentPage: Number(page) || 1
    }
  }

  @Get('/:id')
  async show(@Param('id') id: number) {
    const offer = await this.service.findOne({ id })

    if (!offer) throw new HttpError(NOT_FOUND, 'Offer not found')

    return offer
  }

  @Patch('/:id/decrement')
  async decrement(@Param('id') id: number) {
    const offer = await this.service.findOne({ id })

    if (!offer) throw new HttpError(NOT_FOUND, 'Offer not found')

    offer.decrement()

    const result = await this.service.update({ id: offer.id }, { seats: offer.seats } as Offer)

    if (!result.affected) throw new HttpError(BAD_REQUEST, 'Not updated')

    return offer
  }

  @Post('/')
  async create(@BodyParam('offer', { required: true }) offer: Offer, @Res() res: Response) {
    const offerCreateResult = await this.service.create(offer)

    if (offerCreateResult) return res.status(CREATED).json(offer)

    throw new HttpError(BAD_REQUEST, 'Offer not created')
  }

  @Delete('/:id')
  async delete(@Param('id') id: number, @Res() res: Response) {
    const offer = await this.service.findOne({ id })

    if (!offer) throw new HttpError(NOT_FOUND, 'Offer not found')

    const result = await this.service.delete({ id })

    if (!result.affected) throw new HttpError(BAD_REQUEST, 'Not deleted')

    return res.sendStatus(NO_CONTENT)
  }
}
