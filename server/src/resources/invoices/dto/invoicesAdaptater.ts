import { InvoicesSchema } from '../entity/invoices.schema';
import { InvoicesDto } from './invoices.dto';

export function invoicesToFullDto(invoices: InvoicesSchema): InvoicesDto {
  return { ...invoices };
}

export function fullDtoToInvoices(invoices: InvoicesDto): InvoicesSchema {
  return { ...invoices };
}
