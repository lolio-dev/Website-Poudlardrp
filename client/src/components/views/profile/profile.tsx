import { FunctionComponent, useState } from 'react';
import { FiInfo, FiAlertTriangle } from 'react-icons/fi';
import { useTranslation } from 'react-multi-lang';
import { Navigate } from 'react-router-dom';

import { useToastify } from '../../../hooks/useToastify';
import { ProfileService } from '../../../models/resources/profile/profile.service';
import { ButtonSizes } from '../../../types/enums/ButtonSizes';
import { ButtonTypes } from '../../../types/enums/ButtonTypes';
import { Fonts } from '../../../types/enums/Fonts';
import { Profile } from '../../../types/model/Profile';
import Button from '../../elements/button/button';
import { TextInput } from '../../elements/text-input/text-input';

import styles from './profile.module.scss';

type Props = {
  profileProps?: Profile;
};

export const ProfileView: FunctionComponent<Props> = ({ profileProps }) => {
  const t = useTranslation();
  const { toastError, toastSuccess } = useToastify();
  const [profile, setProfile] = useState(profileProps);
  const [email, setEmail] = useState(profile?.email);

  if (!profile) return <Navigate replace to="/" />;

  const handleEmailOnChange = (value: any) => {
    setEmail(value.target.value);
  };

  const handleSetEmail = async () => {
    try {
      if (!email) {
        throw new Error('email must be an email');
      }

      const updatedprofile = await ProfileService.registerEmail(email);

      setProfile({
        ...profile,
        ...updatedprofile,
      });

      toastSuccess(`Un email de confirmation a été envoyé à ${email}`, {
        onClose: () => window.location.reload(),
      });
    } catch (error: any) {
      toastError(t(typeof error.message === 'object' ? error.message[0] : error.message));
    }
  };

  return (
    <main className={styles.main}>
      <img
        className={styles.playerHead}
        src={`https://crafthead.net/avatar/${profile.uuid}`}
        alt="player head"
      />
      <div className={styles.mail}>
        <TextInput
          id="email"
          label="Email"
          type="email"
          onChange={handleEmailOnChange}
          defaultValue={profile.email}
        ></TextInput>
        <div className={styles.info}>
          <FiInfo></FiInfo>
          <p>{t('profile.email_use')}</p>
        </div>
        <div className={styles.warning}>
          <FiAlertTriangle></FiAlertTriangle>
          <p>{t('profile.terms')}</p>
        </div>
      </div>

      <Button
        type={ButtonTypes.outlined}
        className={styles.send}
        onClick={handleSetEmail}
        label={'Envoyer'}
        font={Fonts.montserrat16regular}
        borderSize={1}
        size={ButtonSizes.mini}
        width={'100px'}
      ></Button>
    </main>
  );
};
