import { InvoiceProductSchema } from '../entity/invoice_product.schema';
import { InvoiceProductDto } from './invoice_product.dto';

export function invoicesProductToFullDto(
  invoices_product: InvoiceProductSchema
): InvoiceProductDto {
  return { ...invoices_product };
}

export function fullDtoToInvoicesProduct(
  invoices_product: InvoiceProductDto
): InvoiceProductSchema {
  return { ...invoices_product };
}
