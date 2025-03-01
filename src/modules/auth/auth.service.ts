import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  // Validate user login
  async validateUser(loginUserDto: LoginDto) {
    const { username, password } = loginUserDto;

    const user = await this.userService.findOneByUsername(username);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  // Generate JWT token
  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
