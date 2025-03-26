import { Injectable, ForbiddenException,ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository,In } from 'typeorm';
import { User,UserRole,UserStatus } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { FindUserDto } from './dto/find-user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async createUser(dto: CreateUserDto): Promise<User> {
    const { username, email, password, role, status,firstName,lastName } = dto;

    const existingUser = await this.userRepository.findOne({ where: [{ email }, { username }] });
    if (existingUser) {
      throw new ConflictException('Username or Email already exists');
    }
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.userRepository.create({
      username,
      email,
      password: hashedPassword,
      role,
      status: status || UserStatus.Active,
      firstName,
      lastName,
    });
    const newUser = await this.userRepository.save(user);
    delete newUser.password;
    return newUser;
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { email } });
  }
  
  async findAllUsers(dto: FindUserDto) {
    return this.userRepository.createQueryBuilder('user').getMany();
  }

  async findUserById(
    id: string,
    selectSecrets:boolean = false,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: { id },
      select: {
        id: true,
        username: true,
        firstName: true,
        lastName: true,
        role: true,
        password: selectSecrets,
      },
    });
  }


  async updateUser(id: string, updateData: Partial<User>, currentUser: User): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (currentUser.role === UserRole.User && currentUser.id !== id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    if (updateData.role && currentUser.role !== UserRole.Super_Admin) {
      throw new ForbiddenException('Only Super Admin can change roles');
    }
    if (updateData.password) {
      updateData.password = await bcrypt.hash(updateData.password, 10);
    }
    Object.assign(user, updateData);
    await this.userRepository.save(user);
    return user;
  }

  async deleteUser(id: string, currentUser: User): Promise<string> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (currentUser.role === UserRole.User) {
      throw new ForbiddenException('You are not allowed to delete users');
    }
    if (user.role === UserRole.Admin && currentUser.role !== UserRole.Super_Admin) {
      throw new ForbiddenException('Only Super Admin can delete Admins');
    }
    await this.userRepository.delete(id);
    return 'User deleted successfully';
  }
}
