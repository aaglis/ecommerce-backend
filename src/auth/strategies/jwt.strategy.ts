import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserFromJwt } from '../models/user-from-jwt';
import { UserPayload } from '../models/user-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: UserPayload): Promise<UserFromJwt> {
    return {
      id: payload.id,
      email: payload.email,
      name: payload.name,
      alias: payload.alias,
      cpf: payload.cpf,
      dateOfBirth: payload.dateOfBirth,
      phone: payload.phone,
      cep: payload.cep,
      streetName: payload?.streetName,
      city: payload?.city,
      residenceNumber: payload?.residenceNumber,
    };
  }
}
