import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from "vitest";

import { Alert } from './alert';
import {
  IncompleteProfile,
  UnverifiedProfile,
  VerifiedProfile,
} from '../../../tests/fixtures/profile.fixture';

describe('Alert module', () => {
  describe('rendering alert', () => {
    it('should not render if there is no profile', () => {
      const result = render(
        <BrowserRouter>
          <Alert></Alert>
        </BrowserRouter>
      );

      expect(result.queryByTestId('alert')).toBeNull();
    });

    it('should not render if there is a profil but no alerts', () => {
      const result = render(
        <BrowserRouter>
          <Alert profile={VerifiedProfile}></Alert>
        </BrowserRouter>
      );

      expect(result.queryByTestId('alert')).toBeNull();
    });

    it('should not render an alert if profile is incomplete', () => {
      const result = render(
        <BrowserRouter>
          <Alert profile={IncompleteProfile}></Alert>
        </BrowserRouter>
      );

      expect(result.queryByTestId('alert')).toBeDefined();
      expect(result.queryByTestId('incomplete')).not.toBeNull();
    });

    it('should not render an alert if profile is unverified', () => {
      const result = render(
        <BrowserRouter>
          <Alert profile={UnverifiedProfile}></Alert>
        </BrowserRouter>
      );

      expect(result.queryByTestId('alert')).toBeDefined();
      expect(result.queryByTestId('unverified')).not.toBeNull();
    });
  });
});
