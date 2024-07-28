import { Controller, Post, Body, Get, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<CreateUserDto | null> {
    return this.userService.create(createUserDto);
  }

  @Get(':id')
  findById(@Param('id') id: number): Promise<CreateUserDto | null> {
    return this.userService.findById(id);
  }

  @Get()
  findByEmail(@Query('email') email: string): Promise<CreateUserDto | null> {
    return this.userService.findByEmail(email);
  }

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
