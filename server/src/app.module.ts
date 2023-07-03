import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { RolesGuard } from './guards/roles.guard';
import { ProductSchema } from './resources/products/entity/product.schema';
import * as Migration from './migration/index';
import { ProductsModule } from './resources/products/products.module';
import { GemsModule } from './resources/gems/gems.module';
import { GemSchema } from './resources/gems/entity/gem.schema';
import { PaymentsModule } from './resources/payments/payments.module';
import { ConfigModule } from '@nestjs/config';
import { JsonBodyMiddleware } from './middlewares/json-body-middleware';
import { raw } from 'express';
import { CartModule } from './resources/cart/cart.module';
import { NewsModule } from './resources/news/news.module';
import { NewsSchema } from './resources/news/entity/news.schema';
import { InvoicesModule } from './resources/invoices/invoices.module';
import { InvoicesSchema } from './resources/invoices/entity/invoices.schema';
import { InvoiceProductSchema } from './resources/invoice_product/entity/invoice_product.schema';
import { InvoiceProductModule } from './resources/invoice_product/invoice_product.module';
import { TransactionsSchema } from './resources/transactions/entity/transactionsSchema';
import { TransactionsModule } from './resources/transactions/transactions.module';
import { PDFModule } from './resources/transactions/pdf/pdf.module';
import { WinstonModule } from 'nest-winston';
import { FilesModule } from './resources/files/files.module';
import { AuthModule } from './auth/auth.module';
import { ProfileSchema } from './resources/profile/entity/profile.schema';
import { ProfileModule } from './resources/profile/profile.module';
import { CartSchema } from './resources/cart/entity/cart.schema';
import { JwtStrategy } from './guards/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { bearer_secret } from '../config/constants';
import { PartnerCodeSchema } from './resources/partner_code/entity/partner_code.schema';
import { PartnerCodeModule } from './resources/partner_code/patner_code.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    JwtModule.register({
      secret: bearer_secret(),
      signOptions: { expiresIn: '1d' },
    }),
    WinstonModule.forRoot({}),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.TYPEORM_HOST,
      port: +process.env.TYPEORM_PORT,
      username: process.env.TYPEORM_USERNAME,
      password: process.env.TYPEORM_PASSWORD,
      database: process.env.TYPEORM_DATABASE,
      entities: [
        ProfileSchema,
        ProductSchema,
        GemSchema,
        CartSchema,
        NewsSchema,
        InvoicesSchema,
        InvoiceProductSchema,
        TransactionsSchema,
        PartnerCodeSchema,
      ],
      migrations: [Migration.User1629843991508],
      synchronize: true,
    }),
    AuthModule,
    ProfileModule,
    ProductsModule,
    GemsModule,
    PaymentsModule,
    CartModule,
    NewsModule,
    InvoicesModule,
    InvoiceProductModule,
    TransactionsModule,
    PDFModule,
    FilesModule,
    PartnerCodeModule,
  ],
  controllers: [AppController],
  providers: [AppService, RolesGuard, JwtStrategy],
})
export class AppModule {
  constructor(private connection: Connection) {}
  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(raw({ type: 'application/json' }))
      .forRoutes({
        path: '/payments/stripe/webhook',
        method: RequestMethod.POST,
      })
      .apply(JsonBodyMiddleware)
      .forRoutes('*');
  }
}
