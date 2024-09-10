import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({ example: 'teste@teste.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Testesenha123#' })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      'Senha precisa ter 8 caracteres, uma letra maiúscula e um caractere especial.',
  })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  alias: string;

  @ApiProperty({ example: 'John' })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ example: 'Doe' })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ example: '000.000.000-00' })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, {
    message: 'CPF precisa estar no formato 000.000.000-00.',
  })
  cpf: string;

  @ApiProperty({ example: '1990-01-01T00:00:00.000Z' })
  @IsDateString()
  dateOfBirth: Date;

  @ApiProperty({ example: '(00) 0 0000-0000' })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({ example: '00000-000' })
  @IsString()
  @IsOptional()
  cep?: string;

  @ApiProperty({ example: 'Rua Teste' })
  @IsString()
  @IsOptional()
  streetName?: string;

  @ApiProperty({ example: 'Fortaleza' })
  @IsString()
  @IsOptional()
  city?: string;

  @ApiProperty({ example: 'Bairro Teste' })
  @IsString()
  @IsOptional()
  neighborhood?: string;

  @ApiProperty({ example: 'CE' })
  @IsString()
  @IsOptional()
  state?: string;

  @ApiProperty({ example: '1011' })
  @IsString()
  @IsOptional()
  residenceNumber?: string;
}
