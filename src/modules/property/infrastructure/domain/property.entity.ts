import { Column, Entity, JoinColumn, OneToOne } from 'typeorm';

import { BaseEntity } from '../../../shared/infrastructure/domain/base-entity.entity';
import { GeometryTransformer } from '../../../shared/infrastructure/domain/geometry-transformer';
import { Point } from 'geojson';
import { PriceEntity } from './price.entity';

@Entity({ name: 'property' })
export class PropertyEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    name: 'location',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS84 reference system
    transformer: new GeometryTransformer(),
  })
  location: Point;

  @Column({ type: 'int' })
  bedrooms: number;

  @Column({ type: 'int' })
  bathrooms: number;

  @Column({ type: 'int' })
  area: number;

  @Column({ type: 'json' })
  regions: string[];

  @Column({ type: 'varchar' })
  migration: string;

  @OneToOne(() => PriceEntity, { cascade: true, nullable: false })
  @JoinColumn({ name: 'price_id' })
  pricing: PriceEntity;
}
