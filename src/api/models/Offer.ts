import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'offers' })
export class Offer {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ default: 0, unsigned: true })
  public seats: number;

  decrement() {
    if (this.seats === 0) {
      throw new Error('No stock');
    }

    this.seats -= 1;
    return this.seats;
  }
}
