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

  protected findOne<T>(entity: any, condition, options?): Promise<T | undefined> {
    return this.manager.findOne(entity, condition, options);
  }

  async byUniqueId(hash): Promise<DnaChain | null> {
    const entity = await this.findOne<DnaChainEntity>(DnaChainEntity, { hash });
    if (typeof entity === 'undefined') {
      return null;
    }

    const model = new DnaChain();

    model.hydrate({
      createdAt: entity.createdAt,
      hasMutation: entity.hasMutation,
      uniqueId: entity.hash,
      id: entity.id,
      sequence: entity.sequence,
    });

    return model;
  }

  async create(model: DnaChain): Promise<DnaChain> {
    const entity = new DnaChainEntity();
    const { n, m }: { n: number; m: number } = model.dimension();

    entity.sequence = model.sequence;
    entity.rows = m;
    entity.columns = n;
    entity.hasMutation = model.hasMutation;
    entity.hash = model.uniqueId;
    await this.save(entity);

    model.hydrate({ createdAt: entity.createdAt, id: entity.id });

    return model;
  }
}
