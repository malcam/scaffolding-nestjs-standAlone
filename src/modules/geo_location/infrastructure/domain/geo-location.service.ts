import { Connection } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { RegionEntity } from '../../../region/infrastructure/domain/region.entity';
import { Coordinate } from '../../../region/domain/model/coordinate';
import { GeoLocationServiceInterface } from '../../domain/contrats/geo-location-service.interface';

@Injectable()
export class GeoLocationService implements GeoLocationServiceInterface {
  constructor(private readonly connection: Connection) {}

  async isInSavedRegion(location: Coordinate): Promise<boolean> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    let result;
    try {
      result = await queryRunner.manager
        .createQueryBuilder<RegionEntity>(RegionEntity, 'REGION')
        .where(
          `ST_Intersects (
            ST_GeomFromText ( 'POINT(:latitude :longitude)' ),
            ST_Envelope (
              LineString (
                ST_GeomFromText (
                ST_AsText ( bottom_left_location )),
              ST_GeomFromText (
          ST_AsText ( upper_right_location )))))`,
          { longitude: location.x, latitude: location.y },
        )
        .getCount();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return Boolean(result);
  }

  async regionNamesFromPoint(location: Coordinate): Promise<string[] | undefined> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    let result;
    try {
      result = await queryRunner.manager
        .createQueryBuilder<RegionEntity>(RegionEntity, 'REGION')
        .select('name')
        .where(
          `ST_Intersects (
            ST_GeomFromText ( 'POINT(:latitude :longitude)' ),
            ST_Envelope (
              LineString (
                ST_GeomFromText (
                ST_AsText ( bottom_left_location )),
              ST_GeomFromText (
          ST_AsText ( upper_right_location )))))`,
          { longitude: location.x, latitude: location.y },
        )
        .getRawMany();
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }

    return result?.map((item) => item.name);
  }
}
