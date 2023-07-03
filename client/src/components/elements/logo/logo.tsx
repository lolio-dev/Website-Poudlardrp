import { FunctionComponent } from 'react';

import logo from '../../../assets/images/logos/logo.webp';
import { Sizes } from '../../../types/enums/Sizes';

import styles from './logo.module.scss';

type Props = {
  size: Sizes;
  pulsing?: boolean;
};

export const Logo: FunctionComponent<Props> = ({ pulsing = false, size }) => {
  return (
    <div className={styles[size]}>
      <img
        className={`${pulsing ? styles.pulsing : ''} ${styles.logo}`}
        src={logo}
        alt="Logo de PoudlardRP"
      />
    </div>
  );
};
