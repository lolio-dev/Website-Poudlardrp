import { FunctionComponent } from 'react';

import styles from './banner.module.scss';

type Props = {
  images: string[];
  alt: string;
};

export const Banner: FunctionComponent<Props> = ({ images, alt, children }) => {
  const rand = Math.floor(Math.random() * images.length);
  const image = images[rand];

  return (
    <div className={styles.banner}>
      <img className={styles.banner__image} src={image} alt={alt} />
      <div className={styles.banner__childrens}>{children}</div>
    </div>
  );
};
