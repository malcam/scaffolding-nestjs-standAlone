import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/modules/main/main.module';
import { CreateRegionService } from '../src/modules/example-module/application/create-region.service';
import { ExampleModule } from '../src/modules/example-module/example.module';
import { randAddress } from '@ngneat/falso';
import { Region } from '../src/modules/example-module/domain/model/region';
import { Connection } from 'typeorm';
import { RegionMother } from './region-mother';

const existingCityName = randAddress({ includeCounty: false }).city;

describe('Create Region Test', () => {
  let service: CreateRegionService;
  let application: TestingModule;

  beforeAll(async () => {
    application = await Test.createTestingModule({
      imports: [MainModule, ExampleModule],
    }).compile();

    service = application.get<CreateRegionService>(CreateRegionService);
    const command = RegionMother.randomCreateCommand();
    command.name = existingCityName;

    application.get(Connection);
    await service.process(command);
  });

  afterAll(async () => {
    await application.close();
  });

  it('should create new region', async () => {
    const command = RegionMother.randomCreateCommand();
    const result = await service.process(command);

    expect(result).toBeInstanceOf(Region);
    expect(result.id).toEqual(expect.any(Number));
  });

  it('should throw error when region name already exist', async () => {
    expect.assertions(1);

    const command = RegionMother.randomCreateCommand();
    command.name = existingCityName;

    try {
      await service.process(command);
    } catch (e) {
      expect(e).toEqual(new Error(`The region name already exist`));
    }
  });
});
