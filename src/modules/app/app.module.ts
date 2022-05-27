import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MutationController } from './infrastructure/controllers/mutation.controller';
import { AppController } from './infrastructure/controllers/app.controller';
import { HasMutationService } from './application/has-mutation.service';
import { ConfigModule } from '../config/config.module';
import {
  MUTATION_TEST_SERVICE,
  DNA_REPOSITORY,
  STAT_REPOSITORY,
  UNIQUE_ID_SERVICE,
} from '../shared/injection-tokens';
import { MutationTestService } from './infrastructure/model/mutation-test.service';
import { TypeormDnaRepository } from './infrastructure/repositories/typeorm-dna.repository';
import { DnaChainEntity } from './infrastructure/model/dna-chain.entity';
import { CreateDnaService } from './application/create-dna.service';
import { TypeormStatRepository } from './infrastructure/repositories/typeorm-stat.repository';
import { StatController } from './infrastructure/controllers/stat.controller';
import { FetchStatService } from './application/fetch-stat.service';
import { UniqueIdService } from './infrastructure/model/unique-id.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DnaChainEntity])],
  controllers: [MutationController, StatController, AppController],
  providers: [
    HasMutationService,
    CreateDnaService,
    FetchStatService,
    { provide: MUTATION_TEST_SERVICE, useClass: MutationTestService },
    { provide: DNA_REPOSITORY, useClass: TypeormDnaRepository },
    { provide: STAT_REPOSITORY, useClass: TypeormStatRepository },
    { provide: UNIQUE_ID_SERVICE, useClass: UniqueIdService },
  ],
})
export class AppModule {}
