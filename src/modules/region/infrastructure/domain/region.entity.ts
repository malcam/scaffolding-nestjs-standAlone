import { Column, Entity } from 'typeorm';
import { Point } from 'geojson';
import { BaseEntity } from '../../../shared/infrastructure/domain/base-entity.entity';
import { GeometryTransformer } from '../../../shared/infrastructure/domain/geometry-transformer';

@Entity({ name: 'region' })
export class RegionEntity extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({
    name: 'bottom_left_location',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS84 reference system
    transformer: new GeometryTransformer(),
  })
  bottomLeftLocation: Point;

  @Column({
    name: 'upper_right_location',
    type: 'geometry',
    spatialFeatureType: 'Point',
    srid: 4326, // WGS84 reference system
    transformer: new GeometryTransformer(),
  })
  upperRightLocation: Point;
}
