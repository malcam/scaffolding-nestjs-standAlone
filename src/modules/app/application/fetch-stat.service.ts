import { Injectable, Inject } from '@nestjs/common';
import { STAT_REPOSITORY } from '../../shared/injection-tokens';
import { TypeormStatRepository } from '../infrastructure/repositories/typeorm-stat.repository';
import { Stat } from '../domain/stat';

@Injectable()
export class FetchStatService {
  constructor(
    @Inject(STAT_REPOSITORY)
    private readonly statRepository: TypeormStatRepository,
  ) {}

  /**
   * Fetch stats of DNA
   */
  async query(): Promise<Stat> {
    return this.statRepository.stats();
  }
}
