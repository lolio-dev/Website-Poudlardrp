import { PaypalService } from './paypal.service';
import { Body, Controller, Headers, HttpCode, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { StripeService } from './stripe.service';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { PayementsService } from './payments.service';
import { Profile } from '../../utils/decorators/profile.decorator';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { Role } from '../../types/enums/role.enum';
import { Roles } from '../../utils/decorators/roles.decorator';
import { RolesGuard } from '../../guards/roles.guard';

@ApiTags('Payments')
@Controller('payments')
export class PaymentsController {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly stripeService: StripeService,
    private readonly paiementService: PayementsService
  ) {}

  @Post('paypal')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new paypal order' })
  @ApiResponse({ status: 201, description: 'Order created' })
  @ApiResponse({ status: 500, description: 'Unable to create order' })
  async createPaypalOrder(@Profile() profile: ProfileSchema, @Body() body: any) {
    const offer = await this.paypalService.createOffer(
      body.offerId,
      profile.uuid,
      body.partnerCode
    );

    return offer['links'][1]['href'];
  }

  @Post('paypal/webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Paypal webhook' })
  @ApiResponse({ status: 200, description: 'Webhook received' })
  @ApiResponse({ status: 500, description: 'Unable to receive webhook' })
  verifyPaypalWebhook(@Body() body: any, @Headers() headers: any) {
    return this.paypalService.verifyWebhook(body, headers);
  }

  @Post('stripe')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new stripe session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @ApiResponse({ status: 500, description: 'Unable to create session' })
  async createStripeSession(@Profile() profile: ProfileSchema, @Body() body: any) {
    return await this.stripeService.createSession(body.offerId, profile.uuid, body.partnerCode);
  }

  @Post('stripe/webhook')
  @HttpCode(200)
  @ApiOperation({ summary: 'Stripe webhook' })
  @ApiResponse({ status: 200, description: 'Webhook received' })
  @ApiResponse({ status: 500, description: 'Unable to receive webhook' })
  async verifyStripeWebhook(@Body() body: any, @Headers() headers: any) {
    return await this.stripeService.verifyWebhook(body, headers);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN, Role.MANAGER, Role.STAFF, Role.PARTNER, Role.USER)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create new stripe session' })
  @ApiResponse({ status: 201, description: 'Session created' })
  @ApiResponse({ status: 500, description: 'Unable to create session' })
  @Post()
  paidUserCart(@Profile() profile: ProfileSchema) {
    return this.paiementService.paidUserCart(profile.uuid);
  }
}
