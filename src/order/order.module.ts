import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [OrderService, PrismaService],
  controllers: [OrderController],
  imports: [PrismaModule],
  exports: [OrderService]
})

export class OrderModule {}
