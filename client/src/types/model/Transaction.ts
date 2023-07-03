import { Currencies } from '../enums/Currencies';

export type Transaction = {
  transactionsId: string;
  invoiceId: string;
  price: number;
  currency: Currencies;
  source: string;
  date: string;
  commandId: number;
};
