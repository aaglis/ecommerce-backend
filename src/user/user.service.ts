import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
// import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(createUserDto: CreateUserDto) {
    const user = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      dateOfBirth: new Date(createUserDto.dateOfBirth),
    };

    const createdUser = await this.prisma.user.create({
      data: {
        ...user,
      },
    });

    // const { password, ...createdUserWithoutPassword } = createdUser;
    // return createdUserWithoutPassword as CreateUserDto;
    return {
      ...createdUser,
      password: undefined,
    };
  }

  async findById(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) return null;

    return {
      ...user,
      password: undefined,
    };
  }

  async findByEmail(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) return null;

    return {
      ...user,
    };
  }

  async findAllUsers() {
    const users = await this.prisma.user.findMany();

    return users.map((user) => ({
      ...user,
      password: undefined,
    }));
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
