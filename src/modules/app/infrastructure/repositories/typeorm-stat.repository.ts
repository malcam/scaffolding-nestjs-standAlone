import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import { DnaChainEntity } from '../model/dna-chain.entity';
import { Stat } from '../../domain/stat';

@Injectable()
export class TypeormStatRepository {
  constructor(private readonly connection: Connection) {}

  async stats(): Promise<Stat> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    let result;

    try {
      result = await queryRunner.manager
        .createQueryBuilder<DnaChainEntity>(DnaChainEntity, 'DNA')
        .select('count(*) AS total')
        .addSelect(
          `sum(case when DNA.has_mutation = 1 then 1 else 0 end) AS count_mutations,
          sum(case when DNA.has_mutation = 0 then 1 else 0 end) AS count_no_mutations`,
        )
        .getRawOne();

      const model = new Stat();
      model.hydrate({
        total: result.total,
        countMutations: result.count_mutations,
        countNoMutations: result.count_no_mutations,
      });

      return model;
    } finally {
      // you need to release a queryRunner which was manually instantiated
      await queryRunner.release();
    }
  }
}
