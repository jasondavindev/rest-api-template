import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'

import BaseEntity from '@/database/models/BaseEntity'
import Offer from '@/database/models/Offer'

@Entity({ name: 'courses' })
export default class Course extends BaseEntity<Course> {
  @PrimaryGeneratedColumn()
  id?: number

  @Column()
  name?: string

  @OneToMany(() => Offer, (offer: Offer) => offer.course)
  offers?: Offer[]
}
