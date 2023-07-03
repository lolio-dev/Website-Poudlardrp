import { HttpCode, HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import PaypalHelper from './PaypalHelper';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GemSchema } from '../gems/entity/gem.schema';
import { GemMapper } from '../gems/gem.mapper';
import { UUID } from '../../types/UUID';
import { PayementsService } from './payments.service';
import { ProfileService } from '../profile/profile.service';
import { PartnerCodeService } from '../partner_code/partner_code.service';

@Injectable()
export class PaypalService {
  gemMapper: GemMapper;
  private readonly logger = new Logger(PaypalService.name);

  constructor(
    @InjectRepository(GemSchema)
    private gemRepository: Repository<GemSchema>,
    private paymentsService: PayementsService,
    private profileService: ProfileService,
    private partnerCodeService: PartnerCodeService
  ) {
    this.gemMapper = new GemMapper();
  }

  async createOffer(offerId: string, uuid: UUID, partner_code?: string) {
    const offer = await this.gemRepository.findOne({
      where: { gemOfferId: offerId },
    });

    const code = await this.partnerCodeService.findOne(partner_code);

    if (!offer)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'errors.offer_not_found' },
        HttpStatus.NOT_FOUND
      );

    if (partner_code && !code) {
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'errors.partnercode_not_found' },
        HttpStatus.NOT_FOUND
      );
    }

    const paypalOrder = await new PaypalHelper().createOrder(
      offer.gemOfferId,
      offer.gems,
      offer.bonus,
      code ? (offer.price * code.discount) / 100 : offer.price,
      uuid,
      partner_code,
      code.discount
    );
    if (paypalOrder === null)
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          error: 'Unable to create order',
        },
        HttpStatus.INTERNAL_SERVER_ERROR
      );

    return paypalOrder;
  }

  async verifyWebhook(body: any, headers: []) {
    const isValid = await new PaypalHelper().verifyWebhook(body, headers);

    if (!isValid)
      throw new HttpException(
        { status: HttpStatus.FORBIDDEN, error: 'Bad webhook' },
        HttpStatus.FORBIDDEN
      );

    if (body['event_type'] !== 'CHECKOUT.ORDER.APPROVED') return;

    const customId = body['resource']['purchase_units'][0]['custom_id'].split(':');

    if (!customId[0])
      throw new HttpException(
        { status: HttpStatus.BAD_REQUEST, error: 'User id is null' },
        HttpStatus.BAD_REQUEST
      );

    const isCompeleted = await new PaypalHelper().capturePayment(body['resource']['id']);
    if (!isCompeleted) {
      this.logger.log(`${customId[0]} didn't complete order ${body['resource']['id']}`);
      return;
    }

    const profile = await this.profileService.findOne(customId[0]);

    if (!profile)
      throw new HttpException(
        { status: HttpStatus.NOT_FOUND, error: 'User not found' },
        HttpStatus.NOT_FOUND
      );

    this.logger.log(`${profile.uuid} buy ${+customId[1]} gemmes with paypal`);

    await this.profileService.addGems(profile.uuid, +customId[1]);

    const description = body['resource']['purchase_units'][0]['items'][0]['description'].split(';');
    const amount = body['resource']['purchase_units'][0]['amount']['value'];
    const code = description[1] === 'undefined' ? null : description[1];
    const documents = await this.paymentsService.createTransactionAndInvoice(
      profile,
      amount,
      0,
      code,
      'paypal',
      body.id
    );

    await this.paymentsService.createInvoiceProduct(
      documents.invoice.invoicesId,
      1,
      null,
      description[0]
    );

    return HttpCode(200);
  }
}
