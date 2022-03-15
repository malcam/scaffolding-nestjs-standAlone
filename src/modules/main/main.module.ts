import { Module } from '@nestjs/common';

import { ConfigModule } from '../config/config.module';
import { options } from '../config/options/config.options';
import { ExampleModule } from '../example-module/example.module';

@Module({
  imports: [ExampleModule, ConfigModule.forRoot(options)],
})
export class MainModule {}
