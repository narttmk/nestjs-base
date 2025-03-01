import { Controller, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('app')
@Controller()
export class AppController {
  @ApiOperation({ summary: 'Ping the server' })
  @ApiResponse({ status: 200, description: 'pong' })
  @Get('ping')
  getPing(): string {
    return 'pong';
  }
}
