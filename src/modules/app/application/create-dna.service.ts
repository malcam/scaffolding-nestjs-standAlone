import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { CreateDnaCommand } from './create-dna.command';
import { DnaChain } from '../domain/dna-chain';
import { DNA_REPOSITORY, UNIQUE_ID_SERVICE } from '../../shared/injection-tokens';
import { DnaRepository } from '../domain/contracts/dna.repository';
import { UniqueIdService as IUniqueIdService } from '../domain/contracts/unique-id.service';

@Injectable()
export class CreateDnaService implements ApplicationService<CreateDnaCommand> {
  constructor(
    @Inject(DNA_REPOSITORY)
    private readonly dnaRepository: DnaRepository,
    @Inject(UNIQUE_ID_SERVICE)
    private readonly uniqueIdService: IUniqueIdService,
  ) {}

  /**
   * Persist a DNA sequence
   * @param command dna data
   */
  async process(command: CreateDnaCommand): Promise<any> {
    const uniqueId = this.uniqueIdService.identityHashCode(command.dna);

    let model = await this.dnaRepository.byUniqueId(uniqueId);

    if (model === null) {
      model = new DnaChain();
      command.dna.forEach((value) => {
        model.add(value);
      });

      model.markMutationWith(command.hasMutation);
      model.makeUnique(this.uniqueIdService.identityHashCode(model.toArray()));

      await this.dnaRepository.create(model);
    }

    return model;
  }
}
