import { render } from '@testing-library/react';
import {
  checkboxFilterGroup,
  radioFilterGroup,
} from '../../../tests/fixtures/filterGroups.fixtures';
import { expect } from "vitest";

import { Filter } from './filter';

describe('Filter element', () => {
  describe('rendering filter', () => {
    it('should render filter with checkbox', () => {
      const result = render(<Filter filterGroup={checkboxFilterGroup} />);

      expect(result).not.toBeNull();
      expect(result.queryByText(checkboxFilterGroup.title)).not.toBeNull();
      expect(result.queryAllByRole('checkbox').length).toEqual(2);
    });

    it('should render filter with radio', () => {
      const result = render(<Filter filterGroup={radioFilterGroup} />);

      expect(result).not.toBeNull();
      expect(result.queryByText(radioFilterGroup.title)).not.toBeNull();
      expect(result.queryAllByRole('radio').length).toEqual(2);
    });
  });
});
