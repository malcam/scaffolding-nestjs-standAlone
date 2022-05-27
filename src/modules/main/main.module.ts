import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { databaseConfigLoader } from '../config/loaders';
import { DatabaseConfigType } from '../config/types/database.type';

import { ConfigModule } from '../config/config.module';
import { ConfigService } from '@nestjs/config';

import { options } from '../config/options/config.options';
import { AppModule } from '../app/app.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfigLoader)],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DatabaseConfigType>('database');
        return {
          type: config.type,
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          synchronize: config.synchronize,
          autoLoadEntities: config.autoLoadEntities,
          migrationsTableName: config.migrationsTableName,
          cli: {
            migrationsDir: 'database/migration',
          },
          logging: config.logging,
          legacySpatialSupport: false,
        } as TypeOrmModuleAsyncOptions;
      },
    }),
    AppModule,
    ConfigModule.forRoot(options),
  ],
})
export class MainModule {}
