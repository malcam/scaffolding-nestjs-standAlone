import { randProductDescription, randProductName, randNumber } from '@ngneat/falso';
import { CreatePropertyCommand } from '../src/modules/property/application/create-property.command';

export class PropertyMother {
  public static randomPlainCoordinate() {
    return {
      longitude: randNumber({ min: -180, max: 180 }),
      latitude: randNumber({ min: -90, max: 90 }),
    };
  }

  public static randomCreateCommand(): CreatePropertyCommand {
    const command = new CreatePropertyCommand();
    command.title = randProductName();
    command.description = randProductDescription();
    command.pricing = {
      rentalPrice: randNumber(),
      administrativeFee: randNumber(),
    };
    command.area = randNumber({ min: 15, max: 300 });
    command.location = PropertyMother.randomPlainCoordinate();
    command.bathrooms = randNumber({ min: 1, max: 4 });
    command.bedrooms = randNumber({ min: 1, max: 6 });
    command.photos = [];

    return command;
  }

  public static playaDelCarmenCreatedCommand(): CreatePropertyCommand {
    const command = PropertyMother.randomCreateCommand();

    command.title = 'Playa del carmen';
    command.location = {
      longitude: -87.12518162,
      latitude: 20.59994279,
    };

    return command;
  }
}
