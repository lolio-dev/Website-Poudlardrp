import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GemSchema } from '../gems/entity/gem.schema';
import { GemMapper } from '../gems/gem.mapper';
import Stripe from 'stripe';
import StripeHelper from './StripeHelper';
import { UUID } from '../../types/UUID';
import { website_url } from '../../../config/constants';
import { PayementsService } from './payments.service';
import { ProfileService } from '../profile/profile.service';
import { PartnerCodeService } from '../partner_code/partner_code.service';

@Injectable()
export class StripeService {
  private readonly stripe = new Stripe(process.env.SHOP_STRIPE_SECRET, {
    apiVersion: '2020-08-27',
    typescript: true,
  });
  gemMapper: GemMapper;
  private readonly logger = new Logger(StripeService.name);

  constructor(
    @InjectRepository(GemSchema)
    private gemRepository: Repository<GemSchema>,
    private paymentsService: PayementsService,
    private profileService: ProfileService,
    private partnerCodeService: PartnerCodeService
  ) {
    this.gemMapper = new GemMapper();
  }

  async createSession(offerId: string, uuid: UUID, partner_code?: string): Promise<string> {
    const offer = await this.gemRepository.findOneBy({
      gemOfferId: offerId,
    });

    const code = await this.partnerCodeService.findOne(partner_code);

    if (!offer) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'errors.offer_not_found' },
        HttpStatus.NOT_FOUND
      );
    }

    if (partner_code && !code) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'errors.partnercode_not_found' },
        HttpStatus.NOT_FOUND
      );
    }

    const profile = await this.profileService.findOne(uuid);
    if (!profile)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND
      );

    let stripeId = profile.stripeId;
    if (!stripeId) {
      const customer = await this.stripe.customers.create({
        name: `${profile.email}`,
        email: profile.email,
        metadata: {
          uuid: profile.uuid,
        },
      });
      stripeId = customer.id;
      await this.profileService.updateProfile(profile.uuid, { stripeId: customer.id });
    }

    if (!offer.stripeId) {
      offer.stripeId = await new StripeHelper().createProduct(offer.gems, offer.bonus, offer.price);
      await this.gemRepository.save(offer);
    }

    const session: Stripe.Checkout.Session = await this.stripe.checkout.sessions.create({
      cancel_url: website_url,
      success_url: `${website_url}/thanks`,
      locale: 'fr',
      line_items: [
        {
          price: offer.stripeId,
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'payment',
      metadata: {
        gems: offer.gems + offer.bonus,
        uuid: profile.uuid,
        price: offer.price,
        partner_code,
      },
      customer: stripeId,
      discounts: code ? [{ coupon: code.discount_stripe_id }] : undefined,
    });

    return session.url;
  }

  async verifyWebhook(body: any, headers: []) {
    const sig = headers['stripe-signature'];
    let event: Stripe.Event | null;

    try {
      event = await this.stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.SHOP_STRIPE_WEBHOOK_SECRET
      );
    } catch (e) {
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Invalid signature' },
        HttpStatus.BAD_REQUEST
      );
    }

    if (!event)
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'Invalid event' },
        HttpStatus.BAD_REQUEST
      );

    if (event.type !== 'checkout.session.completed') return { received: true };
    if (event.data.object['payment_status'] !== 'paid') return { received: true };

    const profile = await this.profileService.findOne(event.data.object['metadata']['uuid']);

    await this.profileService.addGems(
      profile.uuid,
      parseInt(event.data.object['metadata']['gems'])
    );

    await this.paymentsService.createTransactionAndInvoice(
      profile,
      event.data.object['metadata']['price'],
      0,
      event.data.object['metadata']['partner_code'],
      'stripe'
    );

    this.logger.log(
      `${profile.uuid} buy ${event.data.object['metadata']['gems']} gems with stripe`
    );

    return { received: true };
  }
}
