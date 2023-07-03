import { difference } from 'lodash';

import { Product } from '../../../../types/model/Product';

export const filterByRarity = (products: Product[], rarities: string[]): Product[] => {
  return products.filter(product => rarities.includes(product.rarity));
};

export const filterByTags = (products: Product[], tags: string[]): Product[] => {
  return products.filter(product => difference(product.tags, tags).length !== product.tags.length);
};

export const filterByProfile = (
  products: Product[],
  profile: string[],
  gems: number
): Product[] => {
  let filteredProducts = [...products];

  if (profile.includes('canBy')) {
    filteredProducts = filteredProducts.filter(product => product.price <= gems);
  }

  return filteredProducts;
};

export const filterBySearch = (products: Product[], search: string): Product[] => {
  return products.filter(
    product =>
      product.title.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );
};

export const sortByPrices = (products: Product[], order: string) => {
  return products.sort((a, b) => (order === 'dsc' ? b.price - a.price : a.price - b.price));
};
