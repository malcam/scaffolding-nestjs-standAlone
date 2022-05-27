import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MutationController } from './infrastructure/controllers/mutation.controller';
import { AppController } from './infrastructure/controllers/app.controller';
import { HasMutationService } from './application/has-mutation.service';
import { ConfigModule } from '../config/config.module';
import { MUTATION_TEST_SERVICE, DNA_REPOSITORY } from '../shared/injection-tokens';
import { MutationTestService } from './infrastructure/model/mutation-test.service';
import { TypeormDnaRepository } from './infrastructure/repositories/typeorm-dna.repository';
import { DnaChainEntity } from './infrastructure/model/dna-chain.entity';
import { CreateDnaService } from './application/create-dna.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([DnaChainEntity])],
  controllers: [MutationController, AppController],
  providers: [
    HasMutationService,
    CreateDnaService,
    { provide: MUTATION_TEST_SERVICE, useClass: MutationTestService },
    { provide: DNA_REPOSITORY, useClass: TypeormDnaRepository },
  ],
})
export class AppModule {}
