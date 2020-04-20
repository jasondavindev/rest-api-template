import { MigrationInterface, getManager } from 'typeorm'

import { Course } from '@/database/models'
import Offer from '@/database/models/Offer'

export default class CreateOffer1584293099515 implements MigrationInterface {
  public async up() {
    const manager = getManager(process.env.NODE_ENV)

    const offer = new Offer()
    offer.id = 1
    offer.seats = 10
    offer.course = new Course({ name: 'Random' })
    await manager.save(offer.course)
    await manager.save(offer)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down() {}
}
