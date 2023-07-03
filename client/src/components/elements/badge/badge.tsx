import { CSSProperties, FunctionComponent, ReactElement } from 'react';

import { Colors } from '../../../types/enums/Colors';

import style from './badge.module.scss';

interface Props {
  value: string;
  icon: ReactElement;
  backgroundColor?: Colors;
  iconColor?: Colors;
  textColor?: Colors;
  className?: string;
}

const Badge: FunctionComponent<Props> = ({
  value,
  icon,
  backgroundColor = Colors.primary,
  iconColor = Colors.white,
  textColor = Colors.white,
  className = '',
}) => {
  const badgeStyle: CSSProperties = {
    backgroundColor,
  };

  const iconStyle: CSSProperties = {
    color: iconColor,
  };

  const textStyle: CSSProperties = {
    color: textColor,
  };

  return (
    <div className={`${style.badge} ${className}`} style={badgeStyle}>
      <span className={style.icon} style={iconStyle}>
        {icon}
      </span>
      <p className={style.value} style={textStyle}>
        {value}
      </p>
    </div>
  );
};

export { Badge };
