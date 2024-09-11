import { Controller, Post, Get, Body, Param, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/order.dto';
import { AdminOrSuperAdminJwtAuthGuard } from 'src/admin-auth/guards/admin-or-super-admin.guard';

@Controller('order')
export class OrderController {
  constructor(private order: OrderService) {}

  @Post('create')
  async createOrder(@Body() createOrderDto: CreateOrderDto) {
    return this.order.createOrder(createOrderDto);
  }

  @Get('find-all')
  @UseGuards(AdminOrSuperAdminJwtAuthGuard)
  async findAll() {
    return await this.order.findAll();
  }

  @Get('find-one-id/:id')
  async findOneId(@Param('id') id: string) {
    return await this.order.findOneId(id);
  }

  @Get('find-one-userId/:userId')
  async findManyUserId(@Param('userId') userId: number) {
    return await this.order.findManyUserId(userId);
  }
}
