import { FunctionComponent } from 'react';
import { FaDiscord, FaTwitter, FaYoutube, FaInstagram } from 'react-icons/fa';
import { useTranslation } from 'react-multi-lang';
import { Link } from 'react-router-dom';

import { socialLinks } from '../../../constants';

import styles from './footer.module.scss';

export const Footer: FunctionComponent = () => {
  const t = useTranslation();

  return (
    <footer>
      <div className={styles.content}>
        <div className={styles.networks} data-testid="networks">
          <a href={socialLinks.discord}>
            <FaDiscord />
          </a>
          <a href={socialLinks.youtube}>
            <FaYoutube />
          </a>
          <a href={socialLinks.twitter}>
            <FaTwitter />
          </a>
          <a href={socialLinks.instragram}>
            <FaInstagram />
          </a>
        </div>
        <div className={styles.legals} data-testid="legals">
          <Link to={'/terms-cgu'}>{t('footer.cgu')}</Link>
          <Link to={'/terms-cgv'}>{t('footer.cgv')}</Link>
        </div>
        <p className={styles.copyright} data-testid="copyright">
          {t('footer.copyright')}
        </p>
      </div>
    </footer>
  );
};
