import { EntityManager, EntityRepository } from 'typeorm';
import { SaveOptions } from 'typeorm/repository/SaveOptions';
import { DnaChain } from '../../domain/dna-chain';
import { DnaRepository } from '../../domain/contracts/dna.repository';
import { DnaChainEntity } from '../model/dna-chain.entity';

@EntityRepository()
export class TypeormDnaRepository implements DnaRepository {
  constructor(private readonly manager: EntityManager) {}

  protected save<Entity>(entity: Entity, options?: SaveOptions): Promise<Entity> {
    return this.manager.save(entity, options);
  }

  async create(model: DnaChain): Promise<DnaChain> {
    const entity = new DnaChainEntity();
    const { n, m }: { n: number; m: number } = model.dimension();

    entity.sequence = model.sequence;
    entity.rows = m;
    entity.columns = n;
    entity.hasMutation = model.hasMutation;
    await this.save(entity);

    model.hydrate({ createdAt: entity.createdAt, id: entity.id });

    return model;
  }
}
