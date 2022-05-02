import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../../../shared/infrastructure/domain/base-entity.entity';

@Entity({ name: 'price' })
export class PriceEntity extends BaseEntity {
  @Column({ name: 'rental_price', type: 'decimal' })
  rentalPrice: number;

  @Column({ name: 'administrative_fee', type: 'decimal', nullable: true })
  administrativeFee: number;
}
