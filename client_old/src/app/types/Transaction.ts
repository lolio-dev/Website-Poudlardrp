export type Transaction = {
  transactionsId: number,
  userId: number,
  invoiceId: number,
  price: number,
  currency: string,
  source: string,
  date: string,
  commandId: number
}
