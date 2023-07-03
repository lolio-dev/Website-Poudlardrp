import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from "vitest";

import { NotFound } from './not-found';

describe('Not found page', () => {
  describe('rendering page', () => {
    it('sould render the image', () => {
      const result = render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.findByRole('image')).toBeDefined();
    });

    it('should correctly return the text', () => {
      const result = render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.findByRole('h1')).toBeDefined();
    });

    it('should render the button', () => {
      const result = render(
        <BrowserRouter>
          <NotFound />
        </BrowserRouter>
      );

      expect(result).toBeDefined();
      expect(result.findByRole('a')).toBeDefined();
    });
  });
});
