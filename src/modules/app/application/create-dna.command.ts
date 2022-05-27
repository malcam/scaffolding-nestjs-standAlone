import { IsDefined } from 'class-validator';
import { BaseDnaCommand } from './base-dna.command';

export class CreateDnaCommand extends BaseDnaCommand {
  @IsDefined()
  public hasMutation: boolean;
}
