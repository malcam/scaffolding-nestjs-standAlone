import { Controller, Post, Put, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { CreateRegionService } from '../../application/create-region.service';
import { CreateRegionCommand } from '../../application/create-region.command';
import { RegionDto } from './dto/region.dto';
import { UpdateRegionService } from '../../application/update-region.service';
import { UpdateRegionCommand } from '../../application/update-region.command';

@Controller()
export class RegionController {
  constructor(
    private readonly createRegionService: CreateRegionService,
    private readonly updateRegionService: UpdateRegionService,
  ) {}

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

  @Put('/regions/:id')
  async updateRegion(@Param('id') id: number, @Body() command: UpdateRegionCommand): Promise<any> {
    try {
      // FIXME: el parametro id puede ser diferente al id en el body (?)
      command.id = id;
      const result = await this.updateRegionService.process(command);

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
