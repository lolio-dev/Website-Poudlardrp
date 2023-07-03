import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceProductSchema } from './entity/invoice_product.schema';
import { GemsModule } from '../gems/gems.module';
import { ProductsModule } from '../products/products.module';
import { InvoiceProductController } from './invoice_product.controller';
import { InvoiceProductService } from './invoice_product.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([InvoiceProductSchema]),

    GemsModule,

    forwardRef(() => ProductsModule),
  ],
  controllers: [InvoiceProductController],
  providers: [InvoiceProductService],
  exports: [InvoiceProductService, TypeOrmModule],
})
export class InvoiceProductModule {}
