import { NavLink } from './NavLink';

export type NavLinkGroup = {
  [key: string]: {
    title: string;
    subtitle: string;
    links: NavLink[];
  };
};
