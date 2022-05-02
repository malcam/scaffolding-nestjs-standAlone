import {
  IsNotEmpty,
  IsString,
  IsDefined,
  IsObject,
  ValidateNested,
  IsNumber,
  IsPositive,
  IsArray,
  IsOptional,
} from 'class-validator';

import { Command } from '../../shared/contracts/command';
import { CoordinateDto } from '../../region/infrastructure/controllers/dto/coordinate.dto';
import { PricingDto } from '../infrastructure/controllers/dto/pricing.dto';

export class CreatePropertyCommand implements Command {
  @IsNotEmpty()
  @IsString()
  public title: string;

  @IsOptional()
  public description: string;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  public location: CoordinateDto;

  @IsDefined()
  @IsObject()
  @ValidateNested()
  public pricing: PricingDto;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public bedrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public bathrooms: number;

  @IsNotEmpty()
  @IsNumber()
  @IsPositive()
  public area: number;

  @IsOptional()
  @IsArray()
  public photos: string[];
}
