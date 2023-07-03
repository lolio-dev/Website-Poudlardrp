import { merge } from 'lodash';
import { CSSProperties, FunctionComponent } from 'react';

import { ButtonSizes } from '../../../types/enums/ButtonSizes';
import { ButtonTypes } from '../../../types/enums/ButtonTypes';
import { Colors } from '../../../types/enums/Colors';
import { Fonts } from '../../../types/enums/Fonts';

import styles from './button.module.scss';

type Props = {
  onClick: () => void;
  type: ButtonTypes;
  label?: string;
  font?: Fonts;
  onClickWhenDisabled?: () => void;
  size?: ButtonSizes;
  color?: string;
  background?: Colors;
  borderRadius?: number;
  borderColor?: Colors;
  borderSize?: number;
  className?: string;
  width?: string;
  disabled?: boolean;
};

const Button: FunctionComponent<Props> = ({
  onClick,
  label,
  type,
  font = Fonts.montserrat,
  onClickWhenDisabled = () => null,
  size = ButtonSizes.medium,
  color = Colors.black,
  background = Colors.white,
  borderRadius = 0,
  borderColor = Colors.transparent,
  borderSize = 0,
  className,
  width = 'fit-content',
  disabled = false,
  children,
}) => {
  const generalStyle: CSSProperties = {
    borderRadius,
    border: `${borderSize}px solid`,
    fontFamily: font,
    font: font,
    width,
  };

  const activeStyle: CSSProperties = {
    cursor: 'pointer',
    color,
    borderColor,
    backgroundColor: background,
  };

  const outlinedDisabledStyle: CSSProperties = {
    cursor: 'default',
    color: Colors.greyDark,
    borderColor: Colors.greyDark,
    backgroundColor: Colors.transparent,
  };

  const fullDisabledStyle: CSSProperties = {
    cursor: 'default',
    backgroundColor: Colors.greyDark,
    color: Colors.white,
  };

  return (
    <>
      <button
        className={`${styles.button} ${className} ${styles[size]}`}
        style={merge(
          disabled
            ? type === ButtonTypes.outlined
              ? outlinedDisabledStyle
              : fullDisabledStyle
            : activeStyle,
          generalStyle
        )}
        onClick={disabled ? onClickWhenDisabled : onClick}
      >
        {label ? label : children}
      </button>
    </>
  );
};

export default Button;
