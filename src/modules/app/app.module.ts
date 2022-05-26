import { Module } from '@nestjs/common';
import { MutationController } from './infrastructure/controllers/mutation.controller';
import { AppController } from './infrastructure/controllers/app.controller';
import { HasMutationService } from './application/has-mutation.service';
import { ConfigModule } from '../config/config.module';
import { MUTATION_TEST_SERVICE } from '../shared/injection-tokens';
import { MutationTestService } from './infrastructure/model/mutation-test.service';

@Module({
  imports: [ConfigModule],
  controllers: [MutationController, AppController],
  providers: [
    HasMutationService,
    { provide: MUTATION_TEST_SERVICE, useClass: MutationTestService },
  ],
})
export class AppModule {}
