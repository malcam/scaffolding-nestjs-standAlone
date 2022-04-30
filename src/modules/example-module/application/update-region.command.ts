import { CreateRegionCommand } from './create-region.command';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UpdateRegionCommand extends CreateRegionCommand {
  @IsNotEmpty()
  @IsNumber()
  public id: number;
}
