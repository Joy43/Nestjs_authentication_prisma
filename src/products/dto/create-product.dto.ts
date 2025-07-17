import { IsString, IsNumber, IsBoolean, IsOptional, IsEnum } from 'class-validator';

export enum Availability {
  IN_STORE = 'IN_STORE',
  ONLINE = 'ONLINE',
}

export class CreateProductDto {
  @IsString()
  name: string;

  @IsNumber()
  price: number;

  @IsEnum(Availability)
  availability: Availability;

  @IsString()
  description: string;

  @IsBoolean()
  @IsOptional()
  sale?: boolean;

  @IsOptional()
  tagIds?: number[]; 
}
