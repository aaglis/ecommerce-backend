import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AdminAuthService } from '../admin-auth.service';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy, 'local-admin') {
  constructor(private adminAuthService: AdminAuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const result = await this.adminAuthService.validateUser(email, password) 
    console.log('resultado validacao',result)
    return result;
  }
}
