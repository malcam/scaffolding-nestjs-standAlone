import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { HasMutationCommand } from './has-mutation.command';
import { DnaChain } from '../domain/dna-chain';
import { MutationTestService } from '../infrastructure/model/mutation-test.service';
import { MUTATION_TEST_SERVICE } from '../../shared/injection-tokens';

@Injectable()
export class HasMutationService implements ApplicationService<HasMutationCommand> {
  constructor(
    @Inject(MUTATION_TEST_SERVICE)
    private readonly mutationTest: MutationTestService,
  ) {}

  /**
   * Find a mutation in a DNA sequence
   * @param command dna data
   */
  async process(command: HasMutationCommand): Promise<DnaChain> {
    const dnaChainModel = new DnaChain();
    command.dna.forEach((value) => {
      dnaChainModel.add(value);
    });

    if (!this.mutationTest.hasMutation(dnaChainModel.toArray())) {
      dnaChainModel.markMutationWith(false);
    } else {
      dnaChainModel.markMutationWith(true);
    }

    return dnaChainModel;
  }
}
