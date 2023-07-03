import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { Redirect } from './redirect';

describe('Redirect element', () => {
  describe('rendering element', () => {
    it('sould render the link', () => {
      const result = render(
        <BrowserRouter>
          <Redirect to="/" label="foo" />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.findAllByRole('Link')).toBeDefined();
    });
  });
});
