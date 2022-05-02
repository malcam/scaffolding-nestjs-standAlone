import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/modules/main/main.module';
import { CreateRegionService } from '../src/modules/region/application/create-region.service';
import { RegionModule } from '../src/modules/region/region.module';
import { randAddress } from '@ngneat/falso';
import { Region } from '../src/modules/region/domain/model/region';
import { RegionMother } from './region-mother';

const existingCityName = randAddress({ includeCounty: false }).city;

describe('Create Region Test', () => {
  let service: CreateRegionService;
  let application: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);

    application = await Test.createTestingModule({
      imports: [MainModule, RegionModule],
    }).compile();

    service = application.get<CreateRegionService>(CreateRegionService);
    const command = RegionMother.randomCreateCommand();
    command.name = existingCityName;

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
