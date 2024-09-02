import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AdminAuthService } from './admin-auth.service';
import { AdminModule } from 'src/admin/admin.module';
import { JwtModule } from '@nestjs/jwt';
import { AdminLoginValidationMiddleware } from './middlewares/admin-user.middleware';
import { AdminAuthController } from './admin-auth.controller';
import { AdminLocalStrategy } from './strategies/admin-local.strategy';
import { AdminJwtStrategy } from './strategies/admin-jwt.strategy';

@Module({
  imports: [
    AdminModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [AdminAuthController],
  providers: [AdminAuthService, AdminLocalStrategy, AdminJwtStrategy],
})
export class AdminAuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AdminLoginValidationMiddleware).forRoutes('admin/login');
  }
}
