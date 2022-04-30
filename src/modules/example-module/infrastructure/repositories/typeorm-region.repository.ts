import { EntityManager, EntityRepository } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';

import { Region } from '../../domain/model/region';
import { RegionEntity } from '../domain/region.entity';
import { Coordinate } from '../../domain/model/coordinate';

@EntityRepository()
export class TypeormRegionRepository {
  constructor(private readonly manager: EntityManager) {}

  protected save<Entity>(entity: Entity, options?: SaveOptions): Promise<Entity> {
    return this.manager.save(entity, options);
  }

  protected findOne<T>(entity: any, condition, options?): Promise<T | undefined> {
    return this.manager.findOne(entity, condition, options);
  }

  protected mapEntityRootToModel(entity: RegionEntity): Region {
    const result = new Region(
      entity.name,
      new Coordinate(parseInt(entity.bboxBottomLeft, 10), parseInt(entity.bboxBottomLeft, 10)),
      new Coordinate(parseInt(entity.bboxUpperRight, 10), parseInt(entity.bboxUpperRight, 10)),
    );

    result.hydrate({ id: entity.id });

    return result;
  }

  async byName(name: string): Promise<Region | null> {
    const entity = await this.findOne<RegionEntity>(RegionEntity, { name });

    if (typeof entity === 'undefined') {
      return null;
    }

    return Promise.resolve(this.mapEntityRootToModel(entity));
  }

  async create(region: Region): Promise<Region> {
    const entity = new RegionEntity();
    entity.name = region.name;
    entity.bboxUpperRight = `POINT (${region.upperRight.x} ${region.upperRight.y})`;
    entity.bboxBottomLeft = `POINT (${region.bottomLeft.x} ${region.bottomLeft.y})`;
    const result = await this.save<RegionEntity>(entity);

    region.hydrate({ id: result.id });

    return Promise.resolve(region);
  }
}
