import { FunctionComponent } from 'react';
import { useTranslation } from 'react-multi-lang';

import styles from './cgv.module.scss';

export const Cgv: FunctionComponent = () => {
  const t = useTranslation();

  return (
    <main className={styles.main}>
      <p>{t('cgv.start_at')}</p>

      <h2>{t('cgv.scope.title')}</h2>
      <p>{t('cgv.scope.paragraph')}</p>
      <p>{t('cgv.scope.paragraph2.sentence')}</p>

      <ul>
        <li>{t('cgv.scope.paragraph2.list')}</li>
      </ul>

      <p>{t('cgv.scope.paragraph3')}</p>

      <h2>{t('cgv.prices.title')}</h2>
      <p>{t('cgv.prices.paragraph')}</p>
      <p>{t('cgv.prices.paragraph2')}</p>

      <h2>{t('cgv.rebates.title')}</h2>
      <p>{t('cgv.rebates.paragraph')}</p>

      <h2>{t('cgv.discount.title')}</h2>
      <p>{t('cgv.discount.paragraph')}</p>

      <h2>{t('cgv.terms.title')}</h2>
      <p>{t('cgv.terms.paragraph')}</p>
      <ul>
        <li>{t('cgv.terms.list.item')}</li>
        <li>{t('cgv.terms.list.item2')}</li>
      </ul>

      <h2>{t('cgv.estate.title')}</h2>
      <p>{t('cgv.estate.paragraph')}</p>

      <h2>{t('cgv.delivery.title')}</h2>
      <p>{t('cgv.delivery.paragraph')}</p>
      <ul>
        <li>{t('cgv.delivery.list')}</li>
      </ul>

      <p>{t('cgv.delivery.paragraph2')}</p>
      <ul>
        <li>{t('cgv.delivery.list2.item')}</li>
        <li>{t('cgv.delivery.list2.item2')}</li>
      </ul>
      <p>{t('cgv.delivery.paragraph3')}</p>

      <h2>{t('cgv.force_majeure.title')}</h2>
      <p>{t('cgv.force_majeure.paragraph')}</p>

      <h2>{t('cgv.court.title')}</h2>
      <p>{t('cgv.court.paragraph')}</p>
      <p>{t('cgv.court.paragraph2')}</p>

      <p>{t('cgv.sign')}</p>
    </main>
  );
};
