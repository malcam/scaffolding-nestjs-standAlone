import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRegionService } from '../../application/create-region.service';
import { CreateRegionCommand } from '../../application/create-region.command';
import { RegionDto } from './dto/region.dto';

@Controller()
export class RegionController {
  constructor(private readonly createRegionService: CreateRegionService) {}

  @Post('/regions')
  async createRegion(@Body() command: CreateRegionCommand): Promise<any> {
    try {
      const result = await this.createRegionService.process(command);

      return new RegionDto(result);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
