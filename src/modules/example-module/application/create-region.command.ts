import { IsNotEmpty, IsString, IsDefined, IsObject, ValidateNested } from 'class-validator';

import { Command } from '../../shared/contracts/command';
import { CoordinateDto } from '../infrastructure/controllers/dto/coordinate.dto';

export class CreateRegionCommand implements Command {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  public boundingBox: {
    bottomLeft: CoordinateDto;
    upperRight: CoordinateDto;
  };
}
