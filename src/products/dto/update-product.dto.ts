import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator';
import { Availability } from './create-product.dto';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsNumber()
  @IsOptional()
  price?: number;

  @IsEnum(Availability)
  @IsOptional()
  availability?: Availability;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  sale?: boolean;

  @IsOptional()
  tagIds?: number[];
}
