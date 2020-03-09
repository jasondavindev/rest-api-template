import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class OffersMigration1583761557682 implements MigrationInterface {
  name = 'OffersMigration1583761557682'

  public async up(queryRunner: QueryRunner) {
    await queryRunner.createTable(
      new Table({
        name: 'offers',
        columns: [
          {
            name: 'id',
            type: 'integer',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'seats',
            type: 'varchar'
          }
        ]
      })
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('offers')
  }
}
