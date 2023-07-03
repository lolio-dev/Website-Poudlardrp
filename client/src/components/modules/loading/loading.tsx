import { FunctionComponent } from 'react';

import { Sizes } from '../../../types/enums/Sizes';
import { Logo } from '../../elements/logo/logo';

import styles from './loading.module.scss';

export const Loading: FunctionComponent = () => {
  return (
    <div className={styles.logo} data-testid="logo">
      <Logo size={Sizes.medium} pulsing={true} />
    </div>
  );
};
