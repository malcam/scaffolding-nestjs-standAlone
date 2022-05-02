import { IsNotEmpty, IsNumber, IsOptional, IsPositive } from 'class-validator';

export class PricingDto {
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  rentalPrice: number;

  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  @IsNumber()
  administrativeFee: number;
}
