import { Product } from './Product';

export type CartItem = {
  cartId: string;
  quantity: number;
  product: Product;
  uuid: string;
};
