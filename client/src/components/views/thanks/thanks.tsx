import { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Navigate } from 'react-router-dom';

import hat from '../../../assets/images/hat.svg';
import { ProfileService } from '../../../models/resources/profile/profile.service';
import { Profile } from '../../../types/model/Profile';

import styles from './thanks.module.scss';

type Props = {
  profile?: Profile;
};

export const Thanks: FunctionComponent<Props> = ({ profile }) => {
  const t = useTranslation();
  const gems = profile?.gems;

  useEffect(() => {
    if (profile) {
      const intervalId = window.setInterval(() => isUserReceiveGems(), 10000);
      let count = 0; //Check user gems evolution during 1 minute

      const isUserReceiveGems = async () => {
        count++;
        if (count >= 6 || (await ProfileService.getProfile()).gems !== gems) {
          clearInterval(intervalId);
          window.location.href = '/';
        }
      };
    }
  }, [gems, profile]);

  if (!profile) return <Navigate replace to="/" />;

  return (
    <main className={styles.main}>
      <img className={styles.image} src={hat} alt="An happy kawai wizard hat" />
      <h1>{t('thanks.title')}</h1>
      <h2>{t('thanks.subtitle')}</h2>
    </main>
  );
};
