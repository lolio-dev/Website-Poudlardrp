import { render } from '@testing-library/react';

import { Loading } from './loading';

describe('Loading module', () => {
  describe('rendering Loading', () => {
    it('should render the loading', () => {
      const result = render(<Loading />);

      expect(result).not.toBeNull();
      expect(result.queryByTestId('logo')).not.toBeNull();
    });
  });
});
