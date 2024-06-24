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
  @UseGuards(AuthGuard)
  @Get('me')
  async me(@Request() req) {
    const id = req['user']?.id;
    return this.authService.me(id);
  }
}
