import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InvoiceProductSchema } from '../../invoice_product/entity/invoice_product.schema';
import { TransactionsSchema } from '../entity/transactionsSchema';
import { PdfProduct } from '../../../types/PdfProduct';
import { generatePDF } from '../../../utils/pdf/pdf';
import { InvoiceProductService } from '../../invoice_product/invoice_product.service';
import { ProductsService } from '../../products/products.service';
import { ProfileSchema } from '../../profile/entity/profile.schema';
import { TransactionsService } from '../transactions.service';

@Injectable()
export class PDFService {
  constructor(
    private transactionService: TransactionsService,
    private invoiceProductService: InvoiceProductService,
    private productService: ProductsService
  ) {}

  async generatePdf(profile: ProfileSchema, transactionId: string): Promise<Buffer> {
    const transactions: TransactionsSchema[] = await this.transactionService.findAllFromUuid(
      profile.uuid
    );
    const transaction: TransactionsSchema | undefined = transactions.find(
      transaction => transaction.transactionsId == transactionId
    );

    if (!transaction) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'No transaction with this id',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    const invoiceProduct: InvoiceProductSchema[] =
      await this.invoiceProductService.findAllFromInvoicesId(transaction.invoiceId);

    const products: PdfProduct[] = await Promise.all(
      invoiceProduct.map(async ip => ({
        item: (await this.productService.findOne(ip.productId)).title,
        amount: ip.priceGem || ip.priceEuro,
        quantity: ip.quantity,
      }))
    );

    return generatePDF(transaction, profile, products);
  }
}
