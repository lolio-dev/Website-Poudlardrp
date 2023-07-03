import { render } from '@testing-library/react';
import { ProductRarity } from '../../../types/enums/ProductRarity';

import { ProductBadges } from './product-badges';

describe('Loading ProductBadge', () => {
  describe('rendering ProductBadge', () => {
    it('should not render if empty', () => {
      const result = render(<ProductBadges />);

      expect(result.queryByTestId('badges')).toBeNull();
    });

    it('should only render rarity badge', () => {
      const result = render(<ProductBadges rarity={ProductRarity.common} />);

      expect(result.queryByTestId('badges')).not.toBeNull();
      expect(result.queryByText('common')).toBeDefined();
    });

    it('should only render a single tag badge', () => {
      const result = render(<ProductBadges tags={['tag1']} />);

      expect(result.queryByTestId('badges')).not.toBeNull();
      expect(result.queryByText('tag1')).toBeDefined();
    });

    it('should only render multiple tags badges', () => {
      const result = render(<ProductBadges tags={['tag1', 'tag2']} />);

      expect(result.queryByTestId('badges')).not.toBeNull();
      expect(result.queryByText('tag1')).toBeDefined();
      expect(result.queryByText('tag2')).toBeDefined();
    });

    it('should only render multiple tags badges and rarity one time', () => {
      const result = render(
        <ProductBadges rarity={ProductRarity.common} tags={['common', 'tag1', 'tag2']} />
      );

      expect(result.queryByTestId('badges')).not.toBeNull();
      expect(result.queryAllByText('common').length).toEqual(1);
      expect(result.queryByText('tag1')).toBeDefined();
      expect(result.queryByText('tag2')).toBeDefined();
    });
  });
});
