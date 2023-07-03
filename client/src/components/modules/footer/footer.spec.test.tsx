import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Footer } from './footer';

describe('Footer module', () => {
  describe('rendering footer', () => {
    it.skip('sould render join-us link', () => {
      const result = render(
        <BrowserRouter>
          <Footer></Footer>
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.getAllByTestId('join-us')).toBeDefined();
    });

    it('sould render networks links', () => {
      const result = render(
        <BrowserRouter>
          <Footer></Footer>
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.getAllByTestId('networks')).toBeDefined();
    });

    it('sould render legals links', () => {
      const result = render(
        <BrowserRouter>
          <Footer></Footer>
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.getAllByTestId('legals')).toBeDefined();
    });

    it('sould render copyright', () => {
      const result = render(
        <BrowserRouter>
          <Footer></Footer>
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.getAllByTestId('copyright')).toBeDefined();
    });
  });
});
