import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import styles from './redirect.module.scss';

type Props = {
  to: string;
  label: string;
  className?: string;
};

export const Redirect: FunctionComponent<Props> = ({ to, label, className }) => {
  return (
    <Link className={`${styles.link} ${className}`} to={to}>
      {label}
    </Link>
  );
};
