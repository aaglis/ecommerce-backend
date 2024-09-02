import { Injectable } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(adminDto: AdminDto) {
    const admin = {
      ...adminDto,
      password: await bcrypt.hash(adminDto.password, 10),
    };

    const createdAdmin = await this.prisma.admin.create({
      data: {
        ...admin,
      },
    });

    return {
      ...createdAdmin,
      password: undefined,
    };
  }

  async getById(id: number) {
    return this.prisma.admin.findUnique({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.admin.findUnique({
      where: {
        email,
      },
    });
  }
}
