import { MigrationInterface, QueryRunner, getManager } from 'typeorm'

import { Offer } from '@/database/models/Offer'

export class CreateOffer1584293099515 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<any> {
    const manager = getManager(process.env.NODE_ENV)

    const offer = new Offer()
    offer.id = 1
    offer.seats = 10
    await manager.save(offer)
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(queryRunner: QueryRunner): Promise<any> {}
}
