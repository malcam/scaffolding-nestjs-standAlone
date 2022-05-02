import { EntityManager, EntityRepository } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';

import { Coordinate } from '../../../region/domain/model/coordinate';
import { Property } from '../../domain/property';
import { PropertyEntity } from '../domain/property.entity';
import { PriceEntity } from '../domain/price.entity';
import { Price } from '../../domain/price';

@EntityRepository()
export class TypeormPropertyRepository {
  constructor(private readonly manager: EntityManager) {}

  protected save<Entity>(entity: Entity, options?: SaveOptions): Promise<Entity> {
    return this.manager.save(entity, options);
  }

  protected findOne<T>(entity: any, condition, options?): Promise<T | undefined> {
    return this.manager.findOne(entity, condition, options);
  }

  protected mapEntityRootToModel(entity: PropertyEntity): Property {
    const result = new Property(
      entity.title,
      new Coordinate(entity.location.coordinates[0], entity.location.coordinates[1]),
      entity.description,
    );

    result.hydrate({
      id: entity.id,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt,
      tittle: entity.title,
      description: entity.description,
      location: new Coordinate(entity.location.coordinates[0], entity.location.coordinates[1]),
      bedrooms: entity.bedrooms,
      bathrooms: entity.bathrooms,
      pricing: new Price(entity.pricing.rentalPrice, entity.pricing.administrativeFee),
      area: entity.area,
    });

    return result;
  }

  async byIdOrFail(id: number): Promise<Property> {
    const entity = await this.findOne<PropertyEntity>(PropertyEntity, { id });

    if (typeof entity === 'undefined') {
      throw new Error(`The region id not exist`);
    }

    return Promise.resolve(this.mapEntityRootToModel(entity));
  }

  async persist(property: Property): Promise<Property> {
    const entity = new PropertyEntity();
    entity.id = property.id;
    entity.title = property.title;
    entity.description = property.description;
    entity.location = {
      type: 'Point',
      coordinates: [property.location.x, property.location.y],
    };
    entity.bedrooms = property.bedrooms;
    entity.bathrooms = property.bathrooms;
    entity.area = property.area;
    entity.pricing = new PriceEntity({
      rentalPrice: property.pricing.rentalPrice,
      administrativeFee: property.pricing.administrativeFee,
    });
    entity.regions = property.regions;

    const result = await this.save<PropertyEntity>(entity);

    property.hydrate({
      id: result.id,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt,
    });
    property.pricing.hydrate({
      id: result.pricing.id,
      createdAt: result.pricing.createdAt,
      updatedAt: result.pricing.updatedAt,
    });

    return Promise.resolve(property);
  }

  async create(property: Property): Promise<Property> {
    return this.persist(property);
  }

  async update(property: Property): Promise<Property> {
    return this.persist(property);
  }
}
