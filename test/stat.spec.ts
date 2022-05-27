import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../src/modules/main/main.module';

import { FetchStatService } from '../src/modules/app/application/fetch-stat.service';
import { Stat } from '../src/modules/app/domain/stat';

describe('Get DNA stats Use Case', () => {
  let service: FetchStatService;
  let application: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);

    application = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    service = application.get<FetchStatService>(FetchStatService);
  });

  afterAll(async () => {
    await application.close();
  });

  it('Should persist a DNA chain', async () => {
    const result = await service.query();

    expect(result).toBeInstanceOf(Stat);
  });
});
