import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { RestrictedComponent } from './restricted-component';

describe('RestrictedComponent module', () => {
  describe('rendering RestrictedComponent', () => {
    it('should not render if restricted', () => {
      const result = render(
        <BrowserRouter>
          <RestrictedComponent restrictedLinks={['/']}>
            <div data-testid="test"></div>
          </RestrictedComponent>
        </BrowserRouter>
      );

      expect(result).not.toBeNull();
      expect(result.queryByTestId('test')).toBeNull();
    });

    it('should render if not restricted', () => {
      const result = render(
        <BrowserRouter>
          <RestrictedComponent restrictedLinks={[]}>
            <div data-testid="test"></div>
          </RestrictedComponent>
        </BrowserRouter>
      );

      expect(result).not.toBeNull();
      expect(result.queryByTestId('test')).not.toBeNull();
    });
  });
});
