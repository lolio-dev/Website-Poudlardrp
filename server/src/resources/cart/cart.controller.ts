import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
  Delete,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { RolesGuard } from '../../guards/roles.guard';
import { Profile } from '../../utils/decorators/profile.decorator';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { CartService } from './cart.service';
import { CartDto } from './dtos/cart.dto';
import { CreateCartDto } from './dtos/create-cart.dto';
import { CartsDto } from './dtos/carts.dto';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new cart' })
  @ApiResponse({
    status: 201,
    description: 'The cart has been successfully created.',
  })
  @ApiResponse({
    status: 400,
    description: 'The cart is already created.',
  })
  @ApiResponse({ status: 403, description: 'Forbidden operation.' })
  create(@Body() cart: CreateCartDto, @Profile() profile: ProfileSchema) {
    if (cart.quantity > 0) {
      return this.cartService.create(cart, profile.uuid);
    }
    throw new HttpException('The quantity must be greater than 0', HttpStatus.BAD_REQUEST);
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get detailled carts.' })
  @ApiResponse({ status: 200, description: 'Successful operation.' })
  @ApiResponse({ status: 404, description: 'Not Found.' })
  getCartsFromUser(@Profile() profile: ProfileSchema): Promise<CartsDto> {
    return this.cartService.findDetailledsCarts(profile.uuid);
  }

  @Patch(':cartId')
  @ApiOperation({ summary: 'Update a cart' })
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The cart has been successfully updated.',
  })
  @ApiResponse({ status: 400, description: 'Invalid cart ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No cart found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  update(
    @Param('cartId') id: string,
    @Body() cart: Partial<CartDto>,
    @Profile() profile: ProfileSchema
  ) {
    return this.cartService.update(id, cart, profile.uuid);
  }

  @ApiOperation({ summary: 'Delete a cart' })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiBearerAuth()
  @ApiResponse({
    status: 204,
    description: 'The cart has been successfully deleted.',
  })
  @ApiResponse({ status: 400, description: 'Invalid cart ID.' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({ status: 404, description: 'No cart found.' })
  @ApiResponse({ status: 405, description: 'Not allowed.' })
  @Delete(':cartId')
  delete(@Param('cartId') id: string, @Profile() profile: ProfileSchema) {
    return this.cartService.delete(id, profile.uuid);
  }

  @Get('/total')
  @ApiOperation({ summary: 'Get total number of objects in carts from one user' })
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  getTotalCartsQuantity(
    @Profile() profile: ProfileSchema
  ) {
    return this.cartService.getTotalCartsQuantity(profile.uuid);
  }
}
