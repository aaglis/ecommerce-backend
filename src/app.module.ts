import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { AdminAuthModule } from './admin-auth/admin-auth.module';
import { AdminModule } from './admin/admin.module';
import { ProductService } from './product/product.service';
import { ProductModule } from './product/product.module';
import { PrismaService } from './prisma/prisma.service';
import { OrderController } from './order/order.controller';
import { OrderModule } from './order/order.module';
import { OrderService } from './order/order.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    AdminAuthModule,
    AdminModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController, OrderController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    ProductService,
    PrismaService,
    OrderService,
  ],
})
export class AppModule {}
