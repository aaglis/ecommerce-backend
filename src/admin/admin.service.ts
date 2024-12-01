import { Injectable } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import {
  AdminNotFoundException,
  InvalidEmailException,
  InvalidIdException,
} from './exceptions/custom-exceptions';
@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async createAdmin(adminDto: AdminDto) {
    const admin = {
      ...adminDto,
      password: await bcrypt.hash(adminDto.password, 10),
    };

    const createdAdmin = await this.prisma.admin.create({
      data: { ...admin },
    });

    return {
      ...createdAdmin,
      password: undefined,
    };
  }

  async getById(id: number) {
    if (!id) {
      throw new InvalidIdException();
    }

    const user = await this.prisma.admin.findUnique({
      where: { id },
    });

    if (!user) throw new AdminNotFoundException();

    return { ...user, password: undefined };
  }

  async findByEmail(email: string) {
    const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!EMAIL_REGEX.test(email)) throw new InvalidEmailException();

    const user = await this.prisma.admin.findUnique({
      where: { email },
    });

    if (!user) throw new AdminNotFoundException();

    return user;
  }

  async getAllAdmins() {
    const admins = await this.prisma.admin.findMany();
    return admins.map((admin) => {
      return { ...admin, password: undefined };
    });
  }
}
