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

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isValid = bcrypt.compareSync(password, user.password);
      if (isValid) {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    }

    throw new Error('Email ou senha inválidos');
  }

  login(user: User): UserToken {
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

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }
}
