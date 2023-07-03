import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { expect } from "vitest";

import { Status } from '../../../types/enums/status.enum';
import { Profile } from '../../../types/model/Profile';

import { Header } from './header';

describe('Header element', () => {
  describe('rendering dropdown element', () => {
    it('should render the header with the home link', () => {
      const result = render(
        <BrowserRouter>
          <Header profile={undefined} fref={{}} totalCartsQuantity={5} />
        </BrowserRouter>
      );

      expect(result.getAllByRole('banner')).toBeDefined();
      expect(result.getAllByRole('navigation')).toBeDefined();
      expect(result.getAllByRole('link')[0].getAttribute('href')).toBe('/');
    });

    it('should render the header with some public dropdowns', () => {
      const result = render(
        <BrowserRouter>
          <Header profile={undefined} fref={{}} totalCartsQuantity={5} />
        </BrowserRouter>
      );

      expect(result.container.querySelectorAll('.public .dropdown').length).toBeGreaterThan(0);
    });

    it.skip('should render the header with the langage dropdown', () => {
      const result = render(
        <BrowserRouter>
          <Header profile={undefined} fref={{}} totalCartsQuantity={5} />
        </BrowserRouter>
      );

      expect(result.container.querySelectorAll('.icon').length).toEqual(1);
    });

    it('should render the connexion button if there is no profile', () => {
      const result = render(
        <BrowserRouter>
          <Header profile={undefined} fref={{}} totalCartsQuantity={4} />
        </BrowserRouter>
      );

      expect(result.container.querySelectorAll('.signin_microsoft').length).toEqual(1);
    });

    it('should render the profile dropdown if there is a profile connected', () => {
      const profile: Profile = {
        uuid: '18f9c798-16ff-49ba-88ba-b2417f34bf90',
        email: 'foo@foo.foo',
        username: 'foo',
        gems: 0,
        status: Status.VERIFIED,
      };

      const result = render(
        <BrowserRouter>
          <Header totalCartsQuantity={5} profile={profile} fref={{}} />
        </BrowserRouter>
      );

      expect(result.getAllByText(profile.username).length).toEqual(1);
    });
  });
});
