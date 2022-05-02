import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { PROPERTY_REPOSITORY, GEOLOCATION_SERVICE } from '../../shared/injection-tokens';
import { CreatePropertyCommand } from './create-property.command';
import { Property } from '../domain/property';
import { Coordinate } from '../../region/domain/model/coordinate';
import { TypeormPropertyRepository } from '../infrastructure/repositories/typeorm-property.repository';
import { GeoLocationServiceInterface } from '../../geo_location/domain/contrats/geo-location-service.interface';

@Injectable()
export class CreatePropertyService implements ApplicationService<CreatePropertyCommand> {
  constructor(
    @Inject(PROPERTY_REPOSITORY)
    private readonly propertyRepository: TypeormPropertyRepository,
    @Inject(GEOLOCATION_SERVICE)
    private readonly geoLocationService: GeoLocationServiceInterface,
  ) {}

  /**
   * Create a new property
   * @param command property data
   */
  async process(command: CreatePropertyCommand): Promise<any> {
    const property = new Property(
      command.title,
      new Coordinate(command.location.longitude, command.location.latitude),
      command.description,
    );

    property.addRooms(command.bedrooms, command.bathrooms, command.area);
    property.addPrice(command.pricing.rentalPrice, command.pricing.administrativeFee);

    if ((await this.geoLocationService.isInSavedRegion(property.location)) === false) {
      throw new Error('Region no supported');
    }

    const regionNames = await this.geoLocationService.regionNamesFromPoint(property.location);
    regionNames.forEach((name) => property.appendToRegion(name));

    return this.propertyRepository.create(property);
  }
}
