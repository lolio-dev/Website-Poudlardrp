import { render } from '@testing-library/react';
import { expect } from "vitest";

import bannerImage from '../../../assets/images/banners/bannerHome.webp';

import { Banner } from './banner';

describe('Banner element', () => {
  describe('rendering banner', () => {
    it('should render the image', () => {
      const result = render(<Banner images={[bannerImage]} alt="Banner image" />);
      expect(result).toBeDefined();

      const image = result.getByRole('img');

      expect(image.getAttribute('src')).toEqual(bannerImage);
    });

    it('should apply the alt content', () => {
      const result = render(<Banner images={[bannerImage]} alt="Banner image" />);
      expect(result).toBeDefined();

      const image = result.getByRole('img');

      expect(image.getAttribute('alt')).toEqual('Banner image');
    });

    it('should render childrens', () => {
      const children = <p data-testid="paragraph">foo</p>;
      const result = render(
        <Banner images={[bannerImage]} alt="Banner image">
          {children}
        </Banner>
      );

      expect(result).toBeDefined();
      expect(result.getByTestId('paragraph')).toBeDefined();
    });
  });
});
