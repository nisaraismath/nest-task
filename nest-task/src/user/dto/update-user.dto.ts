// import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';
// import { UserRole, UserStatus } from "../entities/user.entity";

// export class UpdateUserDto extends PartialType(CreateUserDto) {
//     readonly username: string;
//     readonly email: string;
//     password: string;
//     readonly firstName: string;
//     readonly lastName: string;
//     readonly role?: UserRole;
//     readonly status?: UserStatus;
// }

import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}
