import { Module } from '@nestjs/common';
import { MutationController } from './infrastructure/controllers/mutation.controller';
import { HasMutationService } from './application/has-mutation.service';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  controllers: [MutationController],
  providers: [HasMutationService],
})
export class AppModule {}
