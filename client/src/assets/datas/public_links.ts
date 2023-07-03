import { NavLinkGroup } from '../../types/logic/NavLinkGroup';

export const public_links: NavLinkGroup = {
  shop: {
    title: 'header.nav.shop.title',
    subtitle: 'header.nav.shop.subtitle',
    links: [
      {
        label: 'header.nav.shop.hats',
        href: '/shop?category=hats',
        params: 'hats',
      },
      {
        label: 'header.nav.shop.titles',
        href: '/shop?category=titles',
        params: 'titles',
      },
      {
        label: 'header.nav.shop.pets',
        href: '/shop?category=pets',
        params: 'pets',
      },
      {
        label: 'header.nav.shop.utils',
        href: '/shop?category=utils',
        params: 'utils',
      },
    ],
  },

  /*game: {
    title: 'header.nav.game.title',
    subtitle: 'header.nav.game.subtitle',
    links: [
      {
        label: 'header.nav.game.launcher',
        href: '/launcher',
      },
      {
        label: 'header.nav.game.vote',
        href: '/vote',
      },
    ],
  },

  quibbler: {
    title: 'header.nav.quibbler.title',
    subtitle: 'header.nav.quibbler.subtitle',
    links: [
      {
        label: 'header.nav.quibbler.article',
        href: '/quibbler',
      },
      {
        label: 'header.nav.quibbler.wiki',
        href: '/wiki',
      },
    ],
  },*/
};
