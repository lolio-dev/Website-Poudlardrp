import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { TransactionsSchema } from '../transactions/entity/transactionsSchema';
import { CartService } from '../cart/cart.service';
import { InvoicesService } from '../invoices/invoices.service';
import { InvoiceProductService } from '../invoice_product/invoice_product.service';
import { TransactionsService } from '../transactions/transactions.service';
import { ProfileService } from '../profile/profile.service';
import { UUID } from '../../types/UUID';
import { FullCartDto } from '../cart/dtos/full-cart.dto';
import { ProfileSchema } from '../profile/entity/profile.schema';
import { MailServices } from '../../utils/mails/mailService';
import { PDFService } from '../transactions/pdf/pdf.service';
import Redis from 'ioredis';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class PayementsService {
  constructor(
    private profileService: ProfileService,
    private cartService: CartService,
    private invoicesService: InvoicesService,
    private transactionService: TransactionsService,
    private invoiceProductService: InvoiceProductService,
    private pdfService: PDFService,
    private readonly configService: ConfigService
  ) {}

  async createInvoiceProduct(
    invoiceId: string,
    quantity: number,
    productId?: string,
    gemId?: string
  ) {
    return this.invoiceProductService.create({
      invoiceId,
      quantity,
      productId,
      gemId,
    });
  }

  async createTransactionAndInvoice(
    profile: ProfileSchema,
    priceEuro,
    priceGems,
    codeId = null,
    source = '',
    commandId = '',
    sendMail = true
  ) {
    const invoice = await this.invoicesService.create({
      uuid: profile.uuid,
      priceEuro,
      priceGems,
      codeId,
    });

    const transaction = await this.transactionService.create({
      invoiceId: invoice.invoicesId,
      source,
      commandId,
    });

    const pdfBuffer: Buffer = await this.pdfService.generatePdf(
      profile,
      transaction.transactionsId
    );

    if (sendMail) {
      await this.sendEmailTransaction(profile, pdfBuffer, transaction.transactionsId);
    }

    await this.invoicesService.update(invoice.invoicesId, {
      status: 'Paid',
      paidAt: new Date(),
    });

    return { invoice, transaction };
  }

  async paidUserCart(uuid: UUID): Promise<TransactionsSchema> {
    const profile = await this.profileService.findOne(uuid);
    const carts: FullCartDto[] = await this.cartService.getDetailledsCarts(uuid);
    let priceGems = 0;

    if (!carts.length) {
      throw new HttpException('Aucun objets dans le panier', HttpStatus.BAD_REQUEST);
    }

    carts.forEach(cart => {
      priceGems += cart.product.price * cart.quantity;
    });

    if (profile.gems < priceGems) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Not enought gems',
        },
        HttpStatus.FORBIDDEN
      );
    }

    const { invoice, transaction } = await this.createTransactionAndInvoice(
      profile,
      0,
      priceGems,
      null,
      '',
      '',
      false
    );

    try {
      await this.giveItems(uuid, carts);
      await Promise.all(
        carts.map(async cart => {
          await this.createInvoiceProduct(
            invoice.invoicesId,
            cart.quantity,
            cart.product.productId
          );
          await this.cartService.delete(cart.cartId, uuid);
        })
      );
    } catch ({ response }) {
      throw new HttpException(response.data.message, response.data.statusCode);
    }

    await this.profileService.substractGems(uuid, priceGems);

    await this.invoicesService.update(invoice.invoicesId, {
      status: 'Paid',
      paidAt: new Date(),
    });

    return transaction;
  }

  private async sendEmailTransaction(profile: ProfileSchema, pdfBuffer: Buffer, id: string) {
    const mailService = new MailServices().getTransporter();

    await mailService.sendMail({
      from: 'no-reply@poudlardrp.fr',
      to: profile.email,
      subject: 'Merci pour votre achat',
      attachments: [
        {
          filename: `facture_${id}.pdf`,
          content: pdfBuffer,
        },
      ],
    });

    return true;
  }

  private async giveItems(uuid: UUID, carts: FullCartDto[]) {
    const client = new Redis({
      host: this.configService.get('REDIS_HOST'),
      password: this.configService.get('REDIS_PASSWORD'),
    });
    const key = `purchase:${uuid}`;
    const purchases: any = await client.hgetall(key);

    Object.keys(purchases).forEach(purchase => {
      purchases[purchase] = JSON.parse(purchases[purchase]);
    });

    for (const cart of carts) {
      if (purchases[cart.product.productId]) {
        purchases[cart.product.productId]['quantity'] += cart.quantity;
      } else {
        purchases[cart.product.productId] = {
          itemId: cart.product.game_identifier,
          quantity: cart.quantity,
          type: cart.product.game_category,
        };
      }
    }

    Object.keys(purchases).forEach(purchase => {
      purchases[purchase] = JSON.stringify(purchases[purchase]);
    });

    return client.hset(key, purchases);
  }
}
