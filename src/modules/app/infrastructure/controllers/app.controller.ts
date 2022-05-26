import { Controller, Get } from '@nestjs/common';
import { HasMutationService } from '../../application/has-mutation.service';
import { hostname } from 'os';

@Controller()
export class AppController {
  constructor(private readonly hasMutationService: HasMutationService) {}

  @Get('/')
  index(): Record<string, unknown> {
    return {
      status: 'ok',
      message: 'Welcome to this coding test',
      hostname: hostname(),
    };
  }

  @Get('/health')
  health(): Record<string, unknown> {
    return {
      status: 'ok',
    };
  }
}
