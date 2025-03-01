import { Body, Controller, Post, Request } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { JwtPayload } from '../auth/jwt-payload.interface';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiOperation({ summary: 'Create a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    if (await this.userService.findOneByEmail(createUserDto.email)) {
      throw new Error('Email already exists');
    }
    if (await this.userService.findOneByUsername(createUserDto.username)) {
      throw new Error('Username already exists');
    }

    return this.userService.create(createUserDto);
  }

  @ApiOperation({ summary: 'Change user password' })
  @ApiResponse({ status: 200, description: 'Password changed successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  @ApiBody({ description: 'Change Password DTO', type: Object })
  @Post('change-password')
  async changePassword(
    @Request() req: { user: JwtPayload },
    @Body() changePasswordDto: any,
  ) {
    try {
      console.log(req.user);
      await this.userService.changePassword(req.user, changePasswordDto);
      return { message: 'Password changed successfully' };
    } catch (error) {
      return { message: error.message };
    }
  }
  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateUserDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
