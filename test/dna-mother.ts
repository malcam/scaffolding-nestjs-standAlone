// eslint-disable-next-line max-len
// import { randProductDescription, randProductName, randNumber } from '@ngneat/falso';
import { CreateDnaCommand } from '../src/modules/app/application/create-dna.command';

export class DnaMother {
  public static mutatedDnaCreateCommand(): CreateDnaCommand {
    const data = ['ATGCGA', 'CAGTGC', 'TTATGT', 'AGAAGG', 'CCCCTA', 'TCACTG'];
    const command = new CreateDnaCommand();
    command.dna = data;

    return command;
  }

  public static notMutatedDnaCreateCommand(): CreateDnaCommand {
    const data = ['ATGCGA', 'CAGTGC', 'TTATTT', 'AGACGG', 'GCGTCA', 'TCACTG'];
    const command = new CreateDnaCommand();
    command.dna = data;

    return command;
  }
}
