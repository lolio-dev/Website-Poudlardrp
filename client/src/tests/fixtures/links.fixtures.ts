import { NavActionGroup } from '../../types/logic/NavActionGroup';
import { NavLinkGroup } from '../../types/logic/NavLinkGroup';

export const single_group_link: NavLinkGroup = {
  test: {
    title: 'foo-title',
    subtitle: 'foo-subtitle',
    links: [
      {
        label: 'foo-label1',
        href: '/foo-href1',
      },
      {
        label: 'foo-label2',
        href: '/foo-href2',
      },
    ],
  },
};

export const multiple_group_link: NavLinkGroup = {
  test1: {
    title: 'foo-title',
    subtitle: 'foo-subtitle',
    links: [
      {
        label: 'foo-label1',
        href: '/foo-href1',
      },
      {
        label: 'foo-label2',
        href: '/foo-href2',
      },
    ],
  },
  test2: {
    title: 'foo-title',
    subtitle: 'foo-subtitle',
    links: [
      {
        label: 'foo-label1',
        href: '/foo-href1',
      },
      {
        label: 'foo-label2',
        href: '/foo-href2',
      },
    ],
  },
};

export const single_group_action: NavActionGroup = {
  test: {
    actions: [
      {
        label: 'foo-label1',
        acion: () => {},
      },
      {
        label: 'foo-label2',
        acion: () => {},
      },
    ],
  },
};

export const multiple_group_action: NavActionGroup = {
  test1: {
    actions: [
      {
        label: 'foo-label1',
        acion: () => {},
      },
      {
        label: 'foo-label2',
        acion: () => {},
      },
    ],
  },
  test2: {
    actions: [
      {
        label: 'foo-label1',
        acion: () => {},
      },
      {
        label: 'foo-label2',
        acion: () => {},
      },
    ],
  },
};
