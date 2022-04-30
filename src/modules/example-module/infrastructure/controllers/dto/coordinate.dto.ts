import { IsNotEmpty, IsNumber } from 'class-validator';

export class CoordinateDto {
  @IsNotEmpty()
  @IsNumber()
  longitude: number;

  @IsNotEmpty()
  @IsNumber()
  latitude: number;
}
