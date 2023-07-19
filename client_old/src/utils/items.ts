import { Product } from "../app/types/Product";


export const getSimilarItem = (baseItem: Product, limit: number, baseItems: Product[]) => {
  let items = baseItems.filter(item => baseItem!.category === item.category);
  items = items.filter(item => item.productId != baseItem.productId);
  items = items.slice(0, limit);

  return items
}
