import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../shared/infrastructure/domain/base-entity.entity';

@Entity({ name: 'dna_chain' })
export class DnaChainEntity extends BaseEntity {
  @Column({ type: 'int' })
  columns: number;

  @Column({ type: 'int' })
  rows: number;

  @Column({ type: 'json' })
  sequence: string[];

  @Column({ type: 'boolean', name: 'has_mutation', nullable: true })
  hasMutation: boolean;
}
