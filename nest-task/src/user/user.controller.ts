import { ForbiddenException, UseGuards, Query, Controller, Get, Post, Req, Body, Patch, Param, Delete, NotFoundException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UserRole, User } from './entities/user.entity';
import { CurrentUser } from '../decorators/current-user.decortor';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
export class UserController {
  constructor(private  userService: UserService) { }

  // @Post('create')
  // @Roles(UserRole.Super_Admin)
  // createUser(@Body() dto: CreateUserDto) {
  //   return this.userService.createUser(dto);
  // }


  @Get()
  findMany(@Query() query: FindUserDto) {
    return this.userService.findMany(query);
  }

  @Get('profile')
  getProfile(@CurrentUser() user: User) {
    return user;
  }


  // @Patch(':id')
  // @Roles(UserRole.Admin, UserRole.Super_Admin, UserRole.User)
  // updateUser(
  //   @Param('id') id: string,
  //   @Body() updateData: Partial<User>,
  //   @Req() req
  // ) {
  //   return this.userService.updateUser(id, updateData, req.user);
  // }


  // @Delete(':id')
  // @Roles(UserRole.Super_Admin, UserRole.Admin)
  // deleteUser(@Param('id') id: string, @Req() req) {
  //   return this.userService.deleteUser(id, req.user);
  // }
}
