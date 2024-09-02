import { IsEmail, IsNotEmpty, Matches } from 'class-validator';
import { Admin } from '../entities/admin.entity';

export class AdminDto extends Admin {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @Matches(/^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.{8,})/, {
    message:
      'Senha precisa ter 8 caracteres, uma letra maiúscula e um caractere especial.',
  })
  password: string;
}
