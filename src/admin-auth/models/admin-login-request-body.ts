import { IsEmail, IsNotEmpty } from 'class-validator';

export class AdminLoginRequestBody {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
