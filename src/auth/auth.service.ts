import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from './models/user-payload';
import { JwtService } from '@nestjs/jwt';
import { UserToken } from './models/user-token';
import { UnauthorizedError } from './errors/unauthorized.error';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);
    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        return { ...user, password: undefined };
      }
    }

    throw new UnauthorizedError('Email ou senha inválidos user');
  }

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      alias: user.alias,
      cpf: user.cpf,
      dateOfBirth: user.dateOfBirth,
      phone: user.phone,
      cep: user?.cep,
      streetName: user?.streetName,
      city: user?.city,
      residenceNumber: user?.residenceNumber,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
