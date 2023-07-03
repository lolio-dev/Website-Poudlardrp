import { Module, forwardRef } from '@nestjs/common';
import { InvoiceProductModule } from '../../invoice_product/invoice_product.module';
import { ProductsModule } from '../../products/products.module';
import { TransactionsModule } from '../transactions.module';
import { PDFController } from './pdf.controller';
import { PDFService } from './pdf.service';

@Module({
  imports: [TransactionsModule, InvoiceProductModule, ProductsModule],
  controllers: [PDFController],
  providers: [PDFService],
  exports: [PDFService],
})
export class PDFModule {}
