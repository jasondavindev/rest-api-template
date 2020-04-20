import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm'

import BaseEntity from '@/database/models/BaseEntity'
import Course from '@/database/models/Course'

@Entity({ name: 'offers' })
export default class Offer extends BaseEntity<Offer> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ default: 0, unsigned: true })
  seats: number

  @ManyToOne(() => Course, (course) => course.offers)
  @JoinColumn({ name: 'course_id' })
  course: Course

  decrement() {
    if (this.seats === 0) {
      throw new Error('No stock')
    }

    this.seats -= 1
    return this.seats
  }
}
