import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IsPublic } from './auth/decorators/is-public.decorator';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @IsPublic()
  @Get()
  getHello(): { message: string } {
    return this.appService.getHello();
  }

  @Get('me')
  getMe(@CurrentUser() user: User): User {
    return user;
  }
}
