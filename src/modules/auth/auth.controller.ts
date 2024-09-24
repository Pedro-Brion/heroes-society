import {
  Controller,
  Get,
  NotFoundException,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //GET -> auth/me
  @Get('me')
  async me(@Request() req: Request) {
    const id = req['user']?.id;
    return this.authService.me(id);
  }
}
