import { FullCartDto } from "../dtos/full-cart.dto";

export const cartsToTotalPrice = (carts: FullCartDto[]): number => {
  let price = 0;

  carts.forEach(cart => {
    price += cart.quantity * cart.product.price;
  });

  return price;
};
