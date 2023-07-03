import { mergeWith } from 'lodash';

import footerEn from '../components/modules/footer/i18n/en.json';
import headerEn from '../components/modules/header/i18n/en.json';
import cartEn from '../components/views/cart/i18n/en.json';
import homeEn from '../components/views/home/i18n/en.json';
import notFoundEn from '../components/views/not-found/i18n/en.json';
import productEn from '../components/views/product/i18n/en.json';

/**
 * Import and add article translations files here
 */
export const en = mergeWith(headerEn, footerEn, notFoundEn, homeEn, cartEn, productEn);
