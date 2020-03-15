import { IsDate } from 'class-validator'
import { Column, PrimaryGeneratedColumn } from 'typeorm'

export class BaseEntity<T> {
  constructor(properties?: T) {
    if (properties) {
      Object.assign(this, properties)
    }
  }

  @Column()
  @PrimaryGeneratedColumn()
  id?: number

  @Column({ type: 'timestamp', default: 'now()', name: 'created_at' })
  @IsDate()
  createdAt?: Date

  @Column({ type: 'timestamp', default: 'now()', name: 'updated_at' })
  @IsDate()
  updatedAt?: Date
}
