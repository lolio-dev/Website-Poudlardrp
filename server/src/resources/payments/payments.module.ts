import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaypalService } from './paypal.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GemSchema } from '../gems/entity/gem.schema';
import { StripeService } from './stripe.service';
import { PayementsService } from './payments.service';
import { CartModule } from '../cart/cart.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { InvoiceProductModule } from '../invoice_product/invoice_product.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { ProfileModule } from '../profile/profile.module';
import { PDFModule } from '../transactions/pdf/pdf.module';
import { PartnerCodeModule } from '../partner_code/patner_code.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forFeature([GemSchema]),
    CartModule,
    ProfileModule,
    InvoicesModule,
    InvoiceProductModule,
    TransactionsModule,
    PDFModule,
    PartnerCodeModule,
    ConfigModule,
  ],
  controllers: [PaymentsController],
  providers: [PaypalService, StripeService, PayementsService],
  exports: [PaypalService, StripeService, TypeOrmModule],
})
export class PaymentsModule {}
