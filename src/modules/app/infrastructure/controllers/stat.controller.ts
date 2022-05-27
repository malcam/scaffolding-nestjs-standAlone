import { Controller, Get } from '@nestjs/common';
import { FetchStatService } from '../../application/fetch-stat.service';
import { StatDto } from './dto/stat.dto';

@Controller()
export class StatController {
  constructor(private readonly fetchStatService: FetchStatService) {}

  @Get('/stats')
  async index(): Promise<StatDto> {
    const model = await this.fetchStatService.query();
    return new StatDto(model);
  }
}
