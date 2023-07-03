import { Controller, Get, Post, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { InvoiceProductService } from './invoice_product.service';
import { CreateInvoiceProductDto } from './dto/invoice_product.dto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';

@ApiTags('InvoiceProduct')
@Controller('invoiceProduct')
export class InvoiceProductController {
  constructor(private readonly invoiceProductService: InvoiceProductService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create an invoice product' })
  @ApiResponse({
    status: 201,
    description: 'The invoice product has been successfully created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() createInvoiceProductDto: CreateInvoiceProductDto) {
    return this.invoiceProductService.create({ ...createInvoiceProductDto });
  }

  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all invoice product.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll() {
    return this.invoiceProductService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all invoice product from invoice id' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Invalid invoice ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No invoice product found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Get(':invoicesId')
  findOne(@Param('invoicesId') invoicesId: string) {
    return this.invoiceProductService.findAllFromInvoicesId(invoicesId);
  }

  @ApiOperation({ summary: 'Update an invoice product' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The invoice product has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid invoice product ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No invoice product found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Patch(':invoiceProductId')
  update(
    @Param('invoiceProductId') invoiceProductId: string,
    @Body() updateInvoiceProductDto: Partial<CreateInvoiceProductDto>
  ) {
    return this.invoiceProductService.update(invoiceProductId, updateInvoiceProductDto);
  }
}
