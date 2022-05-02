import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { GeoLocationService } from './infrastructure/domain/geo-location.service';
import { GEOLOCATION_SERVICE } from '../shared/injection-tokens';

@Module({
  imports: [ConfigModule],
  providers: [{ provide: GEOLOCATION_SERVICE, useClass: GeoLocationService }],
  exports: [GEOLOCATION_SERVICE],
})
export class GeoLocationModule {}
