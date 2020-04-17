import { IsDate, IsOptional } from 'class-validator'
import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm'

export default class BaseEntity<T> {
  constructor(properties?: T) {
    if (properties) {
      Object.assign(this, properties)
    }
  }

  @CreateDateColumn({ name: 'created_at' })
  @IsDate()
  @IsOptional()
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  @IsDate()
  @IsOptional()
  updatedAt?: Date

  @DeleteDateColumn({ name: 'deleted_at' })
  @IsDate()
  @IsOptional()
  deletedAt?: Date
}
