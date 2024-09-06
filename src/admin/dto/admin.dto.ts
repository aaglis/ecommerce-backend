import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Admin } from '../entities/admin.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AdminDto extends Admin {
  @ApiProperty({ example: 'John Doe' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'admin@admin.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'Adminadmin123#' })
  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      'Senha precisa ter 8 caracteres, uma letra maiúscula e um caractere especial.',
  })
  password: string;
}
