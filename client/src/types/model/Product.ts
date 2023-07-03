import { ProductRarity } from '../enums/ProductRarity';

export type Product = {
  productId: string;
  title: string;
  description: string;
  price: number;
  image: string;
  model: string;
  category: string;
  tags: string[];
  maximum: number;
  quantityOwned?: number;
  totalQuantityOwned?: number;
  quantityAvailable?: number;
  totalQuantityAvailable?: number;
  isAvailable: boolean;
  rarity: ProductRarity;
};
