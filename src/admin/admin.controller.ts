import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @IsPublic()
  @Post()
  create(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }

  @IsPublic()
  @Get()
  getById(@Param('id') id: string) {
    return this.adminService.getById(Number(id));
  }
}
