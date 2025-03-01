// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { ChangePasswordDto } from './dto/change-password.dto';
import { JwtPayload } from '../auth/jwt-payload.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // Create a new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const { password, ...userData } = createUserDto;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    const user = this.userRepository.create({
      ...userData,
      password: hashedPassword,
    });

    return await this.userRepository.save(user);
  }

  // Find a user by username
  async findOneByUsername(username: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { username } });
  }

  // Find a user by email (optional)
  async findOneByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email } });
  }

  async changePassword(userInfo: JwtPayload, changePasswordDto: ChangePasswordDto) {
    const { oldPassword, newPassword } = changePasswordDto;
    const user = await this.findOneByUsername(userInfo.sub);
    if (!user) {
      throw new Error('User not found');
    }

    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new Error('Invalid password');
    }

    user.password = await bcrypt.hash(newPassword, 10);

    return await this.userRepository.save(user);
  }
}
