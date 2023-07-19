export type CartItem = {
  userId: number
  cartId: number,
  quantity: number,
  product: {
    productId: number,
    title: string,
    description: string,
    price: number,
    image: string,
    category: string;
    tags: string[]
  },
}
