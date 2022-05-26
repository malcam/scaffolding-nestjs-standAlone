import { Injectable } from '@nestjs/common';
import { DnaMapper } from './dna-mapper';
import { IMutationTestService } from '../../domain/contracts/mutation-test.service';

@Injectable()
export class MutationTestService implements IMutationTestService {
  private readonly mapper: DnaMapper;

  hasMutation(dna: string[]): boolean {
    const mapper = new DnaMapper(dna);

    let result = false;
    for (const entry of mapper.mappedDnaChain()) {
      let accumulator = '';
      for (const step of entry) {
        accumulator += dna[step.y].charAt(step.x);
      }
      if ((result = /([ATCG])\1{3}/.test(accumulator))) {
        break;
      }
    }

    return result;
  }
}
