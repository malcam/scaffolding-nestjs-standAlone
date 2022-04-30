import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/modules/main/main.module';
import { CreateRegionService } from '../src/modules/example-module/application/create-region.service';
import { CreateRegionCommand } from '../src/modules/example-module/application/create-region.command';
import { ExampleModule } from '../src/modules/example-module/example.module';
import { randNumber, randAddress } from '@ngneat/falso';
import { Region } from '../src/modules/example-module/domain/model/region';
import { Connection } from 'typeorm';

const existingCityName = randAddress({ includeCounty: false }).city;
function buildRegionCommand() {
  const command = new CreateRegionCommand();
  command.name = randAddress({ includeCounty: false }).city;
  command.boundingBox = {
    bottomLeft: {
      longitude: randNumber({ min: -180, max: 180 }),
      latitude: randNumber({ min: -90, max: 90 }),
    },
    upperRight: {
      longitude: randNumber({ min: -180, max: 180 }),
      latitude: randNumber({ min: -90, max: 90 }),
    },
  };

  return command;
}

describe('Create Region Test', () => {
  let service: CreateRegionService;
  let application: TestingModule;

  beforeAll(async () => {
    application = await Test.createTestingModule({
      imports: [MainModule, ExampleModule],
    }).compile();

    service = application.get<CreateRegionService>(CreateRegionService);
    const command = buildRegionCommand();
    command.name = existingCityName;

    application.get(Connection);
    await service.process(command);
  });

  afterAll(async () => {
    await application.close();
  });

  it('should create new region', async () => {
    const command = buildRegionCommand();
    const result = await service.process(command);

    expect(result).toBeInstanceOf(Region);
    expect(result.id).toEqual(expect.any(Number));
  });

  it('should throw error when region name already exist', async () => {
    expect.assertions(1);

    const command = buildRegionCommand();
    command.name = existingCityName;

    try {
      await service.process(command);
    } catch (e) {
      expect(e).toEqual(new Error(`The region name already exist`));
    }
  });
});
