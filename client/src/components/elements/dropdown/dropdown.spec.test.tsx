import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { FaGlobe } from 'react-icons/fa';
import { expect } from "vitest";

import { Dropdown } from './dropdown';

import {
  multiple_group_action,
  multiple_group_link,
  single_group_action,
  single_group_link,
} from '../../../tests/fixtures/links.fixtures';

describe('Dropdown element', () => {
  describe('rendering dropdown element', () => {
    it('should render a single dropdown with two links', () => {
      const result = render(
        <BrowserRouter>
          <Dropdown links={single_group_link.test.links} fref={{}} label={'1'}></Dropdown>
        </BrowserRouter>
      );

      expect(result.container.getElementsByClassName('dropdown').length).toEqual(1);
      expect(result.container.getElementsByClassName('link').length).toEqual(2);
    });

    it('should render multiple dropdowns with multiple links', () => {
      const result = render(
        <BrowserRouter>
          {Object.keys(multiple_group_link).map(key => (
            <Dropdown
              key={key}
              links={multiple_group_link[key].links}
              fref={{}}
              label={key}
            ></Dropdown>
          ))}
        </BrowserRouter>
      );

      expect(result.container.getElementsByClassName('dropdown').length).toEqual(2);
      expect(result.container.getElementsByClassName('link').length).toEqual(4);
    });

    it('should render a single dropdown with an icon as button', () => {
      const result = render(
        <BrowserRouter>
          <Dropdown
            links={single_group_link.test.links}
            icon={<FaGlobe></FaGlobe>}
            fref={{}}
            label={'3'}
          ></Dropdown>
        </BrowserRouter>
      );

      expect(result.container.getElementsByClassName('dropdown').length).toEqual(1);
      expect(result.container.getElementsByClassName('icon').length).toEqual(1);
    });

    it('should render a single dropdown with two actions', () => {
      const result = render(
        <BrowserRouter>
          <Dropdown links={single_group_action.test.actions} fref={{}} label={'4'}></Dropdown>
        </BrowserRouter>
      );

      expect(result.container.getElementsByClassName('dropdown').length).toEqual(1);
      expect(result.container.getElementsByClassName('link').length).toEqual(2);
    });

    it('should render multiple dropdowns with multiple action', () => {
      const result = render(
        <BrowserRouter>
          {Object.keys(multiple_group_action).map(key => (
            <Dropdown
              key={key}
              links={multiple_group_action[key].actions}
              fref={{}}
              label={key}
            ></Dropdown>
          ))}
        </BrowserRouter>
      );

      expect(result.container.getElementsByClassName('dropdown').length).toEqual(2);
      expect(result.container.getElementsByClassName('link').length).toEqual(4);
    });
  });
});
