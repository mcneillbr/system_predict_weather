import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInUserDto } from './../user/dto';
import { Public } from './../common/decorators';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async signIn(@Body() signInUserDto: SignInUserDto): Promise<any> {
    return this.authService.signIn(signInUserDto.userName, signInUserDto.password);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
