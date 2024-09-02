import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AdminService } from 'src/admin/admin.service';
import * as bcrypt from 'bcrypt';
import { Admin } from 'src/admin/entities/admin.entity';
import { AdminPayload } from './models/admin-payload';
import { AdminToken } from './models/admin-token';

@Injectable()
export class AdminAuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const admin = await this.adminService.findByEmail(email);
    if (admin) {
      const isValid = bcrypt.compareSync(password, admin.password);
      if (isValid) {
        const { password, ...adminWithoutPassword } = admin;
        return adminWithoutPassword;
      }
    }

    throw new Error('Email ou senha inválidos');
  }

  login(admin: Admin): AdminToken {
    console.log(admin);
    const payload: AdminPayload = {
      id: admin?.id,
      email: admin.email,
      name: admin.name,
      role: admin?.role,
    };

    const jwtToken = this.jwtService.sign(payload);

    return {
      access_token: jwtToken,
    };
  }
}
