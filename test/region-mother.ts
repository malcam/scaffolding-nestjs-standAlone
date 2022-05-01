import { UpdateRegionCommand } from '../src/modules/region/application/update-region.command';
import { randAddress, randNumber } from '@ngneat/falso';
import { CreateRegionCommand } from '../src/modules/region/application/create-region.command';

export class RegionMother {
  public static randomPlainCoordinate() {
    return {
      longitude: randNumber({ min: -180, max: 180 }),
      latitude: randNumber({ min: -90, max: 90 }),
    };
  }

  public static randomUpdateCommand(): UpdateRegionCommand {
    const command = new UpdateRegionCommand();
    command.name = randAddress({ includeCounty: false }).city + randNumber();
    command.boundingBox = {
      bottomLeft: RegionMother.randomPlainCoordinate(),
      upperRight: RegionMother.randomPlainCoordinate(),
    };

    return command;
  }

  public static randomCreateCommand(): CreateRegionCommand {
    const command = new CreateRegionCommand();
    command.name = randAddress({ includeCounty: false }).city + randNumber();
    command.boundingBox = {
      bottomLeft: RegionMother.randomPlainCoordinate(),
      upperRight: RegionMother.randomPlainCoordinate(),
    };

    return command;
  }
}
