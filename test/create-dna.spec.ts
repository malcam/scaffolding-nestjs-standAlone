import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../src/modules/main/main.module';

import { CreateDnaService } from '../src/modules/app/application/create-dna.service';
import { DnaMother } from './dna-mother';
import { DnaChain } from '../src/modules/app/domain/dna-chain';

describe('Create DNA Use Case', () => {
  let service: CreateDnaService;
  let application: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);

    application = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    service = application.get<CreateDnaService>(CreateDnaService);
  });

  afterAll(async () => {
    await application.close();
  });

  it('Should persist a DNA chain', async () => {
    const command = DnaMother.mutatedDnaCreateCommand();
    const result = await service.process(command);

    expect(result).toBeInstanceOf(DnaChain);
    expect(result.id).toEqual(expect.any(Number));
  });
});
