import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  readonly name: string;
  @IsNotEmpty()
  @IsNumber()
  readonly price: number;
  @IsNotEmpty()
  @IsNumber()
  readonly amount: number;
}

export class UpdateProductDto {
  @IsString()
  readonly name?: string;
  @IsNumber()
  readonly price?: number;
  @IsNumber()
  readonly amount?: number;
}
