import { CartItem } from "./CartItem";

export type FullCart = {
  totalPrice: number,
  carts: CartItem[]
}
