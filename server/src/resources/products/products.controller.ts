import { Controller, Get, Post, Body, Patch, Param, UseGuards, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProductDto } from './dto/product.dto';
import { Roles } from '../../utils/decorators/roles.decorator';
import { Role } from '../../types/enums/role.enum';
import { JwtAuthGuard, OptionalAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Profile } from '../../utils/decorators/profile.decorator';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { CreateProductDto } from './dto/create-product.dto';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({
    status: 201,
    description: 'The product has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'The product is already created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all products.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  findAll(@Profile() profile: ProfileSchema) {
    return this.productsService.findAll(profile ? profile.uuid : undefined);
  }

  @Get(':productId')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get one product' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 400, description: 'Invalid product ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No product found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  findOne(
    @Param('productId') productId: string,
    @Profile() profile: ProfileSchema
  ): Promise<ProductDto> {
    return this.productsService.findOne(productId, profile ? profile.uuid : undefined);
  }

  @Get(':productId/similar')
  @UseGuards(OptionalAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get similar products of another product' })
  @ApiResponse({ status: 200, description: 'List of similar products.' })
  @ApiResponse({ status: 404, description: 'No product found.' })
  findSimilar(
    @Param('productId') id: string,
    @Query('limit') limit: number | undefined,
    @Query('excludeBoughtProducts') excludeBoughtProducts: boolean | undefined,
    @Profile() profile: ProfileSchema
  ): Promise<ProductDto[]> {
    return this.productsService.findSimilar(
      id,
      limit,
      excludeBoughtProducts,
      profile ? profile.uuid : undefined
    );
  }

  @ApiOperation({ summary: 'Update a product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The product has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid product ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No product found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Patch(':productId')
  update(@Param('productId') id: string, @Body() updateProductDto: Partial<ProductDto>) {
    return this.productsService.update(id, updateProductDto);
  }

  @ApiOperation({ summary: 'Archive a product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No product found.' })
  @Post(':id/archive')
  archive(@Param('id') id: string) {
    return this.productsService.archive(id);
  }

  @ApiOperation({ summary: 'Unarchive a product' })
  @Roles(Role.ADMIN, Role.MANAGER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'No product found.' })
  @Post(':id/unarchive')
  unarchive(@Param('id') id: string) {
    return this.productsService.unarchive(id);
  }
}
