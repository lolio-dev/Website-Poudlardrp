import { FunctionComponent } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Link } from 'react-router-dom';

import { useToastify } from '../../../hooks/useToastify';
import { ProfileService } from '../../../models/resources/profile/profile.service';
import { Status } from '../../../types/enums/status.enum';
import { Profile } from '../../../types/model/Profile';

import styles from './alert.module.scss';

type Props = {
  profile?: Profile;
};

export const Alert: FunctionComponent<Props> = ({ profile }) => {
  const t = useTranslation();
  const { toastError, toastSuccess } = useToastify();
  let error = undefined;

  const handleResendMail = async () => {
    try {
      await ProfileService.resendEmailValidation();
      toastSuccess('success.mail_send');
    } catch (error: any) {
      toastError(error.message);
    }
  };

  if (!profile) return null;

  if (profile.status === Status.INCOMPLETE) {
    error = (
      <p data-testid="incomplete">
        {t('alert.incomplete.message')}
        <Link to="/profile">{t('alert.incomplete.click')}</Link>
      </p>
    );
  }

  if (profile.status === Status.UNVERIFIED) {
    error = (
      <p data-testid="unverified">
        {`${t('alert.unverified.message.part1')} ${profile.email} ${t(
          'alert.unverified.message.part2'
        )}`}{' '}
        <a onClick={handleResendMail}>{t('alert.unverified.click')}</a>{' '}
        {t('alert.unverified.message.part3')}
      </p>
    );
  }

  if (!error) return null;

  return (
    <div className={styles.alert} data-testid="alert">
      {error}
    </div>
  );
};
