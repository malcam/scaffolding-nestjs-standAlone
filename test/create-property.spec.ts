import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/modules/main/main.module';
import { Region } from '../src/modules/region/domain/model/region';
import { RegionMother } from './region-mother';
import { PropertyModule } from '../src/modules/property/property.module';
import { CreatePropertyService } from '../src/modules/property/application/create-property.service';
import { PropertyMother } from './property-mother';
import { CreateRegionService } from '../src/modules/region/application/create-region.service';
import { RegionModule } from '../src/modules/region/region.module';
import { Property } from '../src/modules/property/domain/property';

describe('Create Region Test', () => {
  let service: CreatePropertyService;
  let application: TestingModule;
  const persistedRegions: Region[] = [];

  beforeAll(async () => {
    jest.setTimeout(10000);

    application = await Test.createTestingModule({
      imports: [MainModule, RegionModule, PropertyModule],
    }).compile();

    const createRegionService = application.get<CreateRegionService>(CreateRegionService);

    persistedRegions.push(await createRegionService.process(RegionMother.mexicoCreateCommand()));
    persistedRegions.push(
      await createRegionService.process(RegionMother.quintanaRooCreateCommand()),
    );

    service = application.get<CreatePropertyService>(CreatePropertyService);
  });

  afterAll(async () => {
    await application.close();
  });

  it('should create new property', async () => {
    const command = PropertyMother.playaDelCarmenCreatedCommand();
    const result = await service.process(command);

    expect(result).toBeInstanceOf(Property);
    expect(result.id).toEqual(expect.any(Number));
    expect(result.regions).toEqual(
      expect.arrayContaining([persistedRegions[0].name, persistedRegions[1].name]),
    );
  });

  it('should throw error when location not exist', async () => {
    const command = PropertyMother.randomCreateCommand();
    // Francia
    command.location = {
      longitude: 8.0095037,
      latitude: 45.3935922,
    };

    try {
      await service.process(command);
    } catch (e) {
      expect(e).toEqual(new Error(`Region no supported`));
    }
  });
});
