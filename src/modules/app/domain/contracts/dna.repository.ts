import { DnaChain } from '../dna-chain';

export interface DnaRepository {
  create(entity: DnaChain): Promise<DnaChain>;
  byUniqueId(hash): Promise<DnaChain | null>;
}
