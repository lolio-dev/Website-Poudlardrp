import { render } from '@testing-library/react';
import { simpleGem } from '../../../tests/fixtures/gem.fixtures';

import { GemCard } from './gem-card';

describe('GemCard module', () => {
  describe('rendering GemCard', () => {
    it('should render GemCard with all informations', () => {
      const result = render(<GemCard gem={simpleGem} />);

      expect(result).not.toBeNull();
      //Check that all informatons are displayed somewhere
      expect(result.baseElement.innerHTML.includes(simpleGem.gems.toString())).toBeTruthy();
      expect(result.baseElement.innerHTML.includes(simpleGem.bonus.toString())).toBeTruthy();
      expect(result.baseElement.innerHTML.includes(simpleGem.price.toString())).toBeTruthy();
    });
  });
});
