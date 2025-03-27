import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { User, UserStatus, UserRole } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { LoginDto } from '../auth/dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private  userService: UserService,
    private  jwtService: JwtService,
  ) {}

  async validateUser({email, password}:LoginDto) {
    const user = await this.userService.findOne(email, true);
    if (!user) {
      return null;
    }

    try {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return null;
      }
    } catch (error) {
      return null;
    }

    delete user.password;

    return user;
  }

  async register(dto: CreateUserDto): Promise<{ user: Omit<User, 'password'> }> {
    const { email, username, password, role = UserRole.User, status = UserStatus.Active, firstName, lastName } = dto;

    const existingUser = await this.userService.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await this.userService.createUser({
      username,
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
      status,
    });

    const { password: _, ...userWithoutPassword } = newUser;
    return { user: userWithoutPassword };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}