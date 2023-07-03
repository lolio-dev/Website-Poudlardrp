import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoicesService } from './invoices.service';
import { InvoicesCreateDto } from './dto/invoices.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';

@ApiTags('Invoices')
@Controller('invoices')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class InvoicesController {
  constructor(private readonly invoicesService: InvoicesService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER)
  @ApiOperation({ summary: 'Create an invoices' })
  @ApiResponse({
    status: 201,
    description: 'The invoices has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'The invoices is already created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() createInvoicesDto: InvoicesCreateDto) {
    return this.invoicesService.create(createInvoicesDto);
  }

  @Get()
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiOperation({ summary: 'Get all invoices.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.invoicesService.findAll();
  }

  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiOperation({ summary: 'Get one invoices' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Invalid invoices ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No invoices found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Get(':invoicesId')
  findOne(@Param('invoicesId') id: string) {
    return this.invoicesService.findOne(id);
  }
}
