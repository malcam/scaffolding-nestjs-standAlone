import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MainModule } from './modules/main/main.module';

import { ServerConfigType } from './modules/config/types/server.type';
import { BadRequestException, Logger, ValidationError, ValidationPipe } from '@nestjs/common';
// import { MicroserviceOptions, TcpClientOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(MainModule);

  const configService: ConfigService = app.get(ConfigService);
  const { host, port, listenerPort, applicationName } =
    configService.get<ServerConfigType>('server');

  /** 
  const options: TcpClientOptions = {
    transport: Transport.TCP,
    options: { host, port },
  };
   app.connectMicroservice<MicroserviceOptions>(options);
*/
  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors: ValidationError[]) => {
        const err = errors.map((el) => {
          return el.constraints;
        });
        throw new BadRequestException(err);
      },
    }),
  );

  /* app.startAllMicroservices().finally(() => {
    Logger.log(`TCP server listening on port ${port}`, 'Microservice');
  });*/

  app.listen(listenerPort, () => {
    Logger.log(`HTTP server listening on port ${listenerPort}`, `${applicationName}`);
  });
}
bootstrap();
