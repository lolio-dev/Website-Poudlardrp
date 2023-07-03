import { render } from '@testing-library/react';
import { expect } from "vitest";

import { Sizes } from '../../../types/enums/Sizes';

import { Logo } from './logo';

describe('Logo element', () => {
  describe('rendering login view', () => {
    it('should render the no pulsing small logo', () => {
      const result = render(<Logo size={Sizes.small} pulsing={false} />);
      const logo = result.getByRole('img');

      expect(result).toBeDefined();
      expect(logo.classList.contains('pulsing')).toBe(false);
      expect(result.container.getElementsByClassName('small').length).toBe(1);
    });

    it('should render the pulsing large logo', () => {
      const result = render(<Logo size={Sizes.large} pulsing={true} />);
      const logo = result.getByRole('img');

      expect(result).toBeDefined();
      expect(logo.classList.contains('pulsing')).toBe(true);
      expect(result.container.getElementsByClassName('large').length).toBe(1);
    });

    it('should render the medium no pulsing logo with default value', () => {
      const result = render(<Logo size={Sizes.medium} />);
      const logo = result.getByRole('img');

      expect(result).toBeDefined();
      expect(logo.classList.contains('pulsing')).toBe(false);
      expect(result.container.getElementsByClassName('medium').length).toBe(1);
    });
  });
});
