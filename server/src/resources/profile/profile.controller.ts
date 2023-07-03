import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/types/enums/role.enum';
import { SoldeFilter } from 'src/types/SoldeFilter';
import { Roles } from 'src/utils/decorators/roles.decorator';
import { website_url } from '../../../config/constants';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { Status } from '../../types/enums/status.enum';
import { Profile } from '../../utils/decorators/profile.decorator';
import { ProfileToPublic } from './adapter/profile.adapter';
import { RegisterEmailDto } from './dto/profile.dto';
import { ProfileSchema } from './entity/profile.schema';
import { ProfileService } from './profile.service';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async findOne(@Profile() profile: ProfileSchema) {
    const username = await this.profileService.getUsername(profile.uuid);

    return { ...ProfileToPublic(profile), username };
  }

  @Get('all')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.profileService.findByQuery({});
  }

  @Post('register')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async registerEmail(@Profile() profile: ProfileSchema, @Body() body: RegisterEmailDto) {
    if (!profile.updatedAt || Date.now() - profile.updatedAt.getTime() >= 86400000) {
      return this.profileService.registerEmail(profile.uuid, body.email);
    }
    throw new HttpException('errors.already_change_in_last_day', HttpStatus.BAD_REQUEST);
  }

  @Get('verify')
  async verifyEmail(@Res() response: Response, @Query() query: { token: string }) {
    await this.profileService.verifyEmail(query.token);
    response.redirect(`${website_url}?success=success.email_verified`);
  }

  @Post('resend')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  async resendValidation(@Profile() profile: ProfileSchema) {
    if (!profile.sendAt || Date.now() - profile.sendAt.getTime() >= 1800000) {
      switch (profile.status) {
      case Status.UNVERIFIED:
        await this.profileService.sendEmailValidation(profile);
        return true;
      case Status.VERIFIED:
        throw new HttpException('errors.email_already_verified', HttpStatus.BAD_REQUEST);
      default:
        throw new HttpException('errors.no_mail_to_verify', HttpStatus.BAD_REQUEST);
      }
    }
    throw new HttpException('errors.already_sent_in_last_half', HttpStatus.BAD_REQUEST);
  }

  @Post('solde')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.PARTNER)
  getSolde(@Profile() profile: ProfileSchema, @Body() body: SoldeFilter) {
    return this.profileService.getPartnerSolde(profile.uuid, body.startAt, body.endAt);
  }

  @Post('soldes')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  getAllSoldes(@Body() body: SoldeFilter) {
    return this.profileService.getAllPartnerSoldes(body.startAt, body.endAt);
  }

  @Get('partners')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  getPartners() {
    return this.profileService.findByQuery({
      where: { role: Role.PARTNER },
    });
  }

  @Post('partners/:uuid')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  addPartners(@Param('uuid') uuid: string, @Body() body: { stripeId: string }) {
    return this.profileService.updateProfile(uuid, {
      role: Role.PARTNER,
      partnerStripeId: body.stripeId,
    });
  }
}
