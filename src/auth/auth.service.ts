import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isValid = await bcrypt.compareSync(password, user.password);
      if (isValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new Error('Email ou senha inválidos');
  }
}
