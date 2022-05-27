import { DnaChain } from '../../../domain/dna-chain';

export class DnaChainDto {
  public uniqueId: string;
  public sequence: string[];
  public hasMutation: boolean;
  public createdAt: Date;

  constructor(model: DnaChain) {
    this.sequence = model.sequence;
    this.uniqueId = model.uniqueId;
    this.createdAt = model.createdAt;
    this.hasMutation = model.hasMutation;
  }
}
