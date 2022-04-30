import { Column, Entity } from 'typeorm';

import { BaseEntity } from './base-entity.entity';

@Entity({ name: 'region' })
export class RegionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'point' })
  bboxBottomLeft: string;

  @Column({ type: 'point' })
  bboxUpperRight: string;
}
