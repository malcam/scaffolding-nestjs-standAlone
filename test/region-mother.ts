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

  public static mexicoCreateCommand(): CreateRegionCommand {
    const command = new CreateRegionCommand();
    command.name = 'Mexico' + randNumber();

    command.boundingBox = {
      bottomLeft: {
        longitude: -117.12776,
        latitude: 14.5388286402,
      },
      upperRight: {
        longitude: -86.811982388,
        latitude: 32.72083,
      },
    };

    return command;
  }

  public static quintanaRooCreateCommand(): CreateRegionCommand {
    const command = new CreateRegionCommand();
    command.name = 'Quintana Roo' + randNumber();

    command.boundingBox = {
      bottomLeft: {
        longitude: -89.29656183,
        latitude: 17.89398542,
      },
      upperRight: {
        longitude: -86.71061093,
        latitude: 21.60550404,
      },
    };

    return command;
  }
}
