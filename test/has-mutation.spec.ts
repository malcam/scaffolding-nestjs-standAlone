import { Test, TestingModule } from '@nestjs/testing';
import { MainModule } from '../src/modules/main/main.module';

import { HasMutationService } from '../src/modules/app/application/has-mutation.service';
import { DnaChain } from '../src/modules/app/domain/dna-chain';
import { DnaMother } from './dna-mother';

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
    const command = DnaMother.mutatedDnaCreateCommand();

    const result = await service.process(command);
    expect(result).toBeInstanceOf(DnaChain);
    expect(result.hasMutation).toBeTruthy();
  });

  it('Should throw a error when has not mutation', async () => {
    const command = DnaMother.notMutatedDnaCreateCommand();

    const result = await service.process(command);
    expect(result.hasMutation).toBeFalsy();
  });
});
