import { concat } from 'lodash';

import { clearSessionStorage } from '../../store/sesionStorage';
import { NavAction } from '../../types/logic/NavAction';
import { NavLink } from '../../types/logic/NavLink';
import { NavLinkGroup } from '../../types/logic/NavLinkGroup';

const refLink: NavLink[] = [
  {
    label: 'header.nav.profile.profile',
    href: '/profile',
  },
  {
    label: 'header.nav.profile.invoices',
    href: '/transactions',
  },
];

const actionLink: NavAction[] = [
  {
    label: 'header.nav.profile.sign_out',
    acion: () => {
      clearSessionStorage();
      window.location.reload();
    },
  },
];

export const private_links: NavLinkGroup = {
  profile: {
    title: '',
    subtitle: 'header.nav.profile.subtitle',
    links: concat(refLink, actionLink as any),
  },
};
