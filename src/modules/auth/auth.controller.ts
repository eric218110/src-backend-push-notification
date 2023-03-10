import { Body, Controller, Post } from '@nestjs/common';
import { AuthUsernameAndPasswordBody } from './auth.model';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  loginUserByUsernameAndPasssword(@Body() body: AuthUsernameAndPasswordBody) {
    return this.authService.loginByEmailAndPassword(body);
  }
}
