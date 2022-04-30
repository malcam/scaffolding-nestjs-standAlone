import { Module } from '@nestjs/common';
import { RegionController } from './infrastructure/controllers/region.controller';
import { CreateRegionService } from './application/create-region.service';
import { ConfigModule } from '../config/config.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeormRegionRepository } from './infrastructure/repositories/typeorm-region.repository';
import { RegionEntity } from './infrastructure/domain/region.entity';
import { REGION_REPOSITORY } from '../shared/injection-tokens';
import { UpdateRegionService } from './application/update-region.service';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([RegionEntity])],
  controllers: [RegionController],
  providers: [
    CreateRegionService,
    UpdateRegionService,
    { provide: REGION_REPOSITORY, useClass: TypeormRegionRepository },
  ],
})
export class ExampleModule {}
