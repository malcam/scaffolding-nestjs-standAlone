import { Test, TestingModule } from '@nestjs/testing';

import { MainModule } from '../src/modules/main/main.module';
import { CreateRegionService } from '../src/modules/example-module/application/create-region.service';
import { ExampleModule } from '../src/modules/example-module/example.module';
import { BoundingBox } from '../src/modules/example-module/domain/model/bounding-box';
import { Longitude } from '../src/modules/example-module/domain/model/longitude';
import { Latitude } from '../src/modules/example-module/domain/model/latitude';
import { UpdateRegionService } from '../src/modules/example-module/application/update-region.service';
import { Region } from '../src/modules/example-module/domain/model/region';
import { RegionMother } from './region-mother';

describe('Update Existing Region Test', () => {
  const persistedRegions: Region[] = [];
  let service: UpdateRegionService;
  let application: TestingModule;

  beforeAll(async () => {
    application = await Test.createTestingModule({
      imports: [MainModule, ExampleModule],
    }).compile();

    const createService = application.get<CreateRegionService>(CreateRegionService);

    while (persistedRegions.length < 2) {
      persistedRegions.push(await createService.process(RegionMother.randomCreateCommand()));
    }

    service = application.get<UpdateRegionService>(UpdateRegionService);
  });

  afterAll(async () => {
    await application.close();
  });

  it('should update a existing region', async () => {
    const command = RegionMother.randomUpdateCommand();
    command.id = persistedRegions[0].id;

    const result = await service.process(command);

    expect(result).toMatchObject({
      _id: command.id,
      _name: command.name,
      boundingBox: new BoundingBox(
        new Longitude(command.boundingBox.bottomLeft.longitude),
        new Latitude(command.boundingBox.bottomLeft.latitude),
        new Longitude(command.boundingBox.upperRight.longitude),
        new Latitude(command.boundingBox.upperRight.latitude),
      ),
    });
  });

  it('should throw error when region name already exist', async () => {
    expect.assertions(1);

    const command = RegionMother.randomUpdateCommand();
    command.id = persistedRegions[0].id;
    command.name = persistedRegions[1].name;

    try {
      await service.process(command);
    } catch (e) {
      expect(e).toEqual(new Error(`The region name already exist`));
    }
  });
});
