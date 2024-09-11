import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AdminOrSuperAdminJwtAuthGuard } from 'src/admin-auth/guards/admin-or-super-admin.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @IsPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Get(':id')
  findById(@Param('id') id: number): any {
    return this.userService.findById(id);
  }

  @Get('users/all')
  @UseGuards(AdminOrSuperAdminJwtAuthGuard)
  findAll(): any {
    return this.userService.findAllUsers();
  }

  // @Get()
  // findByEmail(@Query('email') email: string): Promise<CreateUserDto | null> {
  //   return this.userService.findByEmail(email);
  // }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
