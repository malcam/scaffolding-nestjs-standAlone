import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../src/modules/main/main.module';

import { HasMutationService } from '../src/modules/app/application/has-mutation.service';
import { HasMutationCommand } from '../src/modules/app/application/has-mutation.command';
import { DnaChain } from '../src/modules/app/domain/dna-chain';

describe('Has Mutation Use Case', () => {
  let service: HasMutationService;
  let application: TestingModule;

  beforeAll(async () => {
    jest.setTimeout(10000);

    application = await Test.createTestingModule({
      imports: [MainModule],
    }).compile();

    service = application.get<HasMutationService>(HasMutationService);
  });

  afterAll(async () => {
    await application.close();
  });

  it('Should return a entity when has mutation', async () => {
    const data = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];

    const command = new HasMutationCommand();
    command.dna = data;
    const result = await service.process(command);
    expect(result).toBeInstanceOf(DnaChain);
  });

  it('Should throw a error when has not mutation', async () => {
    const data = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];

    const command = new HasMutationCommand();
    command.dna = data;

    try {
      await service.process(command);
    } catch (e) {
      expect(e).toEqual(new Error(`Mutacion no encontrada`));
    }
  });
});
