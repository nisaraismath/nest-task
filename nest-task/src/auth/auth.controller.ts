import { Controller,Post, Body,Res,Req, UseGuards,UnauthorizedException  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../auth/dto/login-auth.dto';
import { UserService } from '../user/user.service';
import { Public } from '../decorators/public.decortor';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private usersService: UserService
  ) {}

  @Public()
  @Post('register')
  async register(@Body() body: CreateUserDto) {
    const user = await this.usersService.createUser(body);
    return user;
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Req() req: Express.Request ) {
    if (!req.user) {
      throw new UnauthorizedException();
    }
    return this.authService.login(req.user);
  }
}
