import React from 'react';
import { useTranslation } from 'react-multi-lang';

import error from '../../../assets/images/404.svg';
import { Redirect } from '../../elements/redirect/redirect';

import styles from './not-found.module.scss';

export const NotFound: React.FunctionComponent = () => {
  const t = useTranslation();

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <img src={error} alt="A 404 error mixed with deathly hollow symbol" />
        <h1>{t('not-found.label')}</h1>
        <Redirect to="/" label={t('not-found.button')} />
      </div>
    </main>
  );
};
