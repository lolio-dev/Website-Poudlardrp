import { Controller, Get, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { Role } from '../../types/enums/role.enum';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Profile } from '../../utils/decorators/profile.decorator';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionService: TransactionsService) {}

  /**
   * Get all transactions
   */
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.transactionService.findAll();
  }

  /**
   * Get all transactions from profileid
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all transactions from profileid' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'InvalidprofileID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No transactions found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Get('profile')
  findOne(@Profile() profile: ProfileSchema) {
    return this.transactionService.findAllFromUuid(profile.uuid);
  }
}
