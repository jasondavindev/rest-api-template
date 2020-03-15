import { Column, Entity } from 'typeorm'

import { BaseEntity } from '@/database/models/BaseEntity'

@Entity({ name: 'offers' })
export class Offer extends BaseEntity<Offer> {
  @Column({ default: 0, unsigned: true })
  public seats: number

  decrement() {
    if (this.seats === 0) {
      throw new Error('No stock')
    }

    this.seats -= 1
    return this.seats
  }
}
