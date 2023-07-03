import { CSSProperties, FunctionComponent } from 'react';

import { Colors } from '../../../types/enums/Colors';

import styles from './separator.module.scss';

type Props = {
  width: string | number;
  height?: number;
  color?: Colors;
  className?: string;
};

const Separator: FunctionComponent<Props> = ({
  width,
  height = 1,
  color = Colors.lightGrey,
  className,
}) => {
  const style: CSSProperties = {
    backgroundColor: color,
    width: typeof width === 'number' ? `${width}px` : width,
    height: `${height}px`,
  };

  return <div className={`${styles.separator} ${className}`} style={style} />;
};

export default Separator;
