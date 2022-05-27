import { Injectable, Inject } from '@nestjs/common';
import { ApplicationService } from '../../shared/contracts/application-service';
import { CreateDnaCommand } from './create-dna.command';
import { DnaChain } from '../domain/dna-chain';
import { DNA_REPOSITORY } from '../../shared/injection-tokens';
import { DnaRepository } from '../domain/contracts/dna.repository';

@Injectable()
export class CreateDnaService implements ApplicationService<CreateDnaCommand> {
  constructor(
    @Inject(DNA_REPOSITORY)
    private readonly dnaRepository: DnaRepository,
  ) {}

  /**
   * Persist a DNA sequence
   * @param command dna data
   */
  async process(command: CreateDnaCommand): Promise<any> {
    const entity = new DnaChain();
    command.dna.forEach((value) => {
      entity.add(value);
    });

    entity.markMutationWith(command.hasMutation);

    await this.dnaRepository.create(entity);

    return entity;
  }
}
