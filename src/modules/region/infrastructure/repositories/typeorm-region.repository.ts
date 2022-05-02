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
      new Coordinate(
        entity.bottomLeftLocation.coordinates[0],
        entity.bottomLeftLocation.coordinates[1],
      ),
      new Coordinate(
        entity.upperRightLocation.coordinates[0],
        entity.upperRightLocation.coordinates[1],
      ),
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

  async byIdOrFail(id: number): Promise<Region> {
    const entity = await this.findOne<RegionEntity>(RegionEntity, { id });

    if (typeof entity === 'undefined') {
      throw new Error(`The region id not exist`);
    }

    return Promise.resolve(this.mapEntityRootToModel(entity));
  }

  async persist(region: Region): Promise<Region> {
    const entity = new RegionEntity();
    entity.id = region.id;
    entity.name = region.name;

    entity.upperRightLocation = {
      type: 'Point',
      coordinates: [region.upperRight.x, region.upperRight.y],
    };

    entity.bottomLeftLocation = {
      type: 'Point',
      coordinates: [region.bottomLeft.x, region.bottomLeft.y],
    };

    const result = await this.save<RegionEntity>(entity);

    region.hydrate({ id: result.id });

    return Promise.resolve(region);
  }

  async create(region: Region): Promise<Region> {
    return this.persist(region);
  }

  async update(region: Region): Promise<Region> {
    return this.persist(region);
  }
}
