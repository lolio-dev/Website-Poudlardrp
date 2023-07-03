import { products } from '../../../../tests/fixtures/product.fixture';

import {
  filterByProfile,
  filterByRarity,
  filterBySearch,
  filterByTags,
  sortByPrices,
} from './filters';

describe('filters', () => {
  describe('filterByRarity', () => {
    it('it should return no products without filters', () => {
      const result = filterByRarity(products, []);

      expect(result.length).toEqual(0);
    });

    it('it should return some products with one filter', () => {
      const result = filterByRarity(products, ['rare']);

      expect(result.length).toEqual(2);
    });

    it('it should return some products with multiple filter', () => {
      const result = filterByRarity(products, ['rare', 'legendary']);

      expect(result.length).toEqual(3);
    });
  });

  describe('filterByTags', () => {
    it('it should return no products without filters', () => {
      const result = filterByTags(products, []);

      expect(result.length).toEqual(0);
    });

    it('it should return some products with one filter', () => {
      const result = filterByTags(products, ['crown']);

      expect(result.length).toEqual(2);
    });

    it('it should return some products with multiple filter', () => {
      const result = filterByTags(products, ['crown', 'christmas']);

      expect(result.length).toEqual(3);
    });
  });

  describe('filterBySearch', () => {
    it('it should return all products without filters', () => {
      const result = filterBySearch(products, '');

      expect(result.length).toEqual(10);
    });

    it('it should search on title', () => {
      const result = filterBySearch(products, 'Couronne');

      expect(result.length).toEqual(2);
    });

    it('it should search on description', () => {
      const result = filterBySearch(products, 'il clignotte');

      expect(result.length).toEqual(1);
    });

    it('it should not be sensitive to caps', () => {
      const result = filterBySearch(products, 'COURONNE');

      expect(result.length).toEqual(2);
    });
  });

  describe('sortByPrice', () => {
    it('it should not sort asc by default', () => {
      const result = sortByPrices(products, '');

      expect(result[0].title).toEqual('Couronne de roses rouges');
    });

    it('it should sort with asc', () => {
      const result = sortByPrices(products, 'asc');

      expect(result[0].title).toEqual('Couronne de roses rouges');
    });

    it('it should sort with dsc', () => {
      const result = sortByPrices(products, 'dsc');

      expect(result[0].title).toEqual('Couronne');
    });
  });

  describe('filterByProfile', () => {
    it('it should return no products', () => {
      const result = filterByProfile(products, ['canBy'], 0);

      expect(result.length).toEqual(0);
    });

    it('it should filter product that are too expensive', () => {
      const result = filterByProfile(products, ['canBy'], 500);

      expect(result.length).toEqual(6);
    });
  });
});
