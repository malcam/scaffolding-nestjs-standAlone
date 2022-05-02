import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { CreatePropertyCommand } from '../../application/create-property.command';
import { CreatePropertyService } from '../../application/create-property.service';
import { PropertyDto } from './dto/property.dto';

@Controller()
export class PropertyController {
  constructor(private readonly createRegionService: CreatePropertyService) {}

  @Post('/properties')
  async createRegion(@Body() command: CreatePropertyCommand): Promise<any> {
    try {
      const result = await this.createRegionService.process(command);

      return new PropertyDto(result);
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
