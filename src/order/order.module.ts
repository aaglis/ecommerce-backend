import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { PrismaService } from 'src/prisma/prisma.service';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Module({
  providers: [
    OrderService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    PrismaService,
  ],
  controllers: [OrderController],
  imports: [PrismaModule],
  exports: [OrderService],
})
export class OrderModule {}
