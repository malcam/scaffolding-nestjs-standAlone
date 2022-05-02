import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { PROPERTY_REPOSITORY } from '../shared/injection-tokens';
import { TypeormPropertyRepository } from './infrastructure/repositories/typeorm-property.repository';
import { CreatePropertyService } from './application/create-property.service';
import { PropertyController } from './infrastructure/controllers/property.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertyEntity } from './infrastructure/domain/property.entity';
import { PriceEntity } from './infrastructure/domain/price.entity';
import { GeoLocationModule } from '../geo_location/geo-location.module';

@Module({
  imports: [
    ConfigModule,
    GeoLocationModule,
    TypeOrmModule.forFeature([PropertyEntity, PriceEntity]),
  ],
  controllers: [PropertyController],
  providers: [
    CreatePropertyService,
    { provide: PROPERTY_REPOSITORY, useClass: TypeormPropertyRepository },
  ],
})
export class PropertyModule {}
