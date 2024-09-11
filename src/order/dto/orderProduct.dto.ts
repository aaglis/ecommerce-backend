import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateOrderProductDto {
  @IsNotEmpty()
  @IsString()
  readonly productId: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  readonly amount: number;
}
