import { Controller, Get, HttpException, HttpStatus, Logger, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import { OptionalAuthGuard } from './guards/jwt-auth.guard';
import { ProfileSchema } from './resources/profile/entity/profile.schema';
import { Profile } from './utils/decorators/profile.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('')
  @ApiOperation({ summary: 'Using to ping API' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  async ping() {
    return {
      isRunning: true,
      message: 'Yaaaaaaaaaaaa !',
    };
  }

  @Get('/token')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  getToken(@Profile() profile: ProfileSchema) {
    if (profile || process.env.uuid) return this.appService.sign(profile.uuid || process.env.uuid);
    throw new HttpException('errors.unauthorized', HttpStatus.FORBIDDEN);
  }
}
