import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminPayload } from './models/admin-payload';
import { AdminToken } from './models/admin-token';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<Admin> {
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isValid = await bcrypt.compareSync(password, admin.password);
      if (isValid) {
        return {
        ...admin,
        password: undefined,
        }
      }
    }

    throw new UnauthorizedError('Email ou senha inválidos');
  }

  async login(admin: Admin): Promise<AdminToken> {
    const payload: AdminPayload = {
      id: admin?.id,
      email: admin.email,
      name: admin.name,
      role: admin?.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
