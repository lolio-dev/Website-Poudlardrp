import { mergeWith } from 'lodash';

import alertFr from '../components/modules/alert/i18n/fr.json';
import articleFr from '../components/modules/article/i18n/fr.json';
import footerFr from '../components/modules/footer/i18n/fr.json';
import headerFr from '../components/modules/header/i18n/fr.json';
import cartFr from '../components/views/cart/i18n/fr.json';
import gemsFr from '../components/views/gems/i18n/fr.json';
import homeFr from '../components/views/home/i18n/fr.json';
import notFoundFr from '../components/views/not-found/i18n/fr.json';
import productFr from '../components/views/product/i18n/fr.json';
import profileFr from '../components/views/profile/i18n/fr.json';
import shopFr from '../components/views/shop/i18n/fr.json';
import cguFr from '../components/views/terms/cgu/i18n/fr.json';
import cgvFr from '../components/views/terms/cgv/i18n/fr.json';
import thanksFr from '../components/views/thanks/i18n/fr.json';

import dateFr from './date/fr.json';
import toastifyFr from './toastify/fr.json';

/**
 * Import and add article translations files here
 */
export const fr = mergeWith(
  headerFr,
  footerFr,
  notFoundFr,
  articleFr,
  productFr,
  homeFr,
  toastifyFr,
  alertFr,
  shopFr,
  cguFr,
  cgvFr,
  profileFr,
  alertFr,
  cartFr,
  gemsFr,
  thanksFr,
  dateFr
);
