import { Module, forwardRef } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { bearer_email_secret } from '../../../config/constants';
import { CartModule } from '../cart/cart.module';
import { InvoicesModule } from '../invoices/invoices.module';
import { InvoiceProductModule } from '../invoice_product/invoice_product.module';
import { PartnerCodeModule } from '../partner_code/patner_code.module';
import { TransactionsModule } from '../transactions/transactions.module';
import { ProfileSchema } from './entity/profile.schema';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([ProfileSchema]),

    JwtModule.register({
      secret: bearer_email_secret(),
      signOptions: { expiresIn: '1h' },
    }),
    TransactionsModule,
    InvoiceProductModule,
    InvoicesModule,
    PartnerCodeModule,

    forwardRef(() => CartModule),
  ],
  controllers: [ProfileController],
  providers: [ProfileService],
  exports: [ProfileService],
})
export class ProfileModule {}
