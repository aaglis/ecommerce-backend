import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminDto } from './dto/admin.dto';
import { AdminJwtAuthGuard } from 'src/admin-auth/guards/admin-jwt-auth.guard';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  @ApiOperation({
    summary:
      'Cria um novo administrador(somente o administrador com o atributo role = "superAdmin" poderá criar novos administradores).',
  })
  @ApiResponse({
    status: 200,
    description: 'Adiministrador criado com sucesso.',
  })
  @ApiResponse({ status: 401, description: 'Sem autorização' })
  @UseGuards(AdminJwtAuthGuard)
  create(@Body() adminDto: AdminDto) {
    return this.adminService.createAdmin(adminDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Busca um administrador por ID' })
  @UseGuards(AdminJwtAuthGuard)
  getById(@Param('id') id: number) {
    return this.adminService.getById(Number(id));
  }

  @Get('email/:email')
  @ApiOperation({ summary: 'Busca um administrador por email' })
  @ApiResponse({
    status: 200,
    description: 'Administrador encontrado com sucesso.',
  })
  @ApiResponse({ status: 400, description: 'Email inválido fornecido.' })
  @ApiResponse({ status: 404, description: 'Administrador não encontrado.' })
  @UseGuards(AdminJwtAuthGuard)
  async getByEmail(@Param('email') email: string) {
    return await this.adminService.findByEmail(email);
  }
}
