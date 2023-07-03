import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Profile } from 'src/utils/decorators/profile.decorator';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { PartnerCodeService } from './partner_code.service';
import { CreatePartnerCodeDto } from './dto/create-partner_code.dto';

@ApiTags('PartnerCode')
@Controller('partner_code')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class PartnerCodeController {
  constructor(private readonly parnetCodeService: PartnerCodeService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  create(@Body() code: CreatePartnerCodeDto) {
    return this.parnetCodeService.create(code);
  }

  @Post('updateStatus/:id')
  @Roles(Role.ADMIN, Role.MANAGER)
  changeStatus(
    @Param('id') codeId: string,
    @Body() body: {status: string}
  ) {
    return this.parnetCodeService.changeStatus(codeId, body.status);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  findAll() {
    return this.parnetCodeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parnetCodeService.findOne(id)
  }

  @Post('/me')
  @Roles(Role.ADMIN, Role.MANAGER, Role.PARTNER)
  findMyCodes(@Profile() profile: ProfileSchema) {
    return this.parnetCodeService.findAllFromUuid(profile.uuid);
  }
}
