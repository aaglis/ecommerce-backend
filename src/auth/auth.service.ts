import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  login(user: User): UserToken {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }

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
