import { IsNotEmpty, IsDefined, IsArray } from 'class-validator';

import { Command } from '../../shared/contracts/command';

export class CreateDnaCommand implements Command {
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  public dna: string[];
}
