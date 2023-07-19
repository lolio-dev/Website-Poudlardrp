export type InvoiceProduct = {
  id: number;
  invoiceId: number;
  productId: number;
  gemId: number;
  priceHT: number;
  priceGem: number;
  quantity: number
}