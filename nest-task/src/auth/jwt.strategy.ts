import { Injectable , UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { UserService } from '../user/user.service';
import { User } from '../user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:configService.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: any){
    const user = await this.userService.findOne(payload.id);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (user.status !== 'Active') {
      throw new UnauthorizedException(
        `${user.id}, account ${user.status}`,
      );
    }
    return { 
      id: payload.sub, 
      username: payload.username,
      email: payload.email,
      role: payload.role 
    };
  }
}
