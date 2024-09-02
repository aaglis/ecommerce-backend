import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { AdminAuthService } from './admin-auth.service';
import { AdminAuthRequest } from './models/admin-auth-request';
import { AdminLocalAuthGuard } from './guards/admin-local-auth.guard';

@Controller('admin')
export class AdminAuthController {
  constructor(private readonly authService: AdminAuthService) {}

  @IsPublic()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AdminLocalAuthGuard)
  login(@Request() req: AdminAuthRequest) {
    console.log(req.admin);
    return this.authService.login(req.admin);
  }
}
