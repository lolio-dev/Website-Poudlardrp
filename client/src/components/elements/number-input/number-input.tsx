import { FunctionComponent, useState } from 'react';

import { Colors } from '../../../types/enums/Colors';
import { NumberInputSizes } from '../../../types/enums/NumberInputSizes';

import styles from './number-input.module.scss';

interface Props {
  defaultValue: number;
  onChange: (value: number) => void;
  onClickWhenDisabled?: () => void;
  onMaxReached?: () => void;
  onMinReached?: () => void;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  size?: NumberInputSizes;
  className?: string;
}

const NumberInput: FunctionComponent<Props> = (
  {
    defaultValue,
    onChange,
    onClickWhenDisabled,
    onMaxReached = () => null,
    onMinReached = () => null,
    min = 1,
    max,
    step = 1,
    disabled,
    size = NumberInputSizes.medium,
    className = '',
  }) => {
  const [value, setValue] = useState(defaultValue);

  const increaseCounter = () => {
    if (disabled) return;
    const newValue = value + step;
    if (max && newValue > max) {
      onMaxReached()
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const decreaseCounter = () => {
    if (disabled) return;
    const newValue = value - step;
    if (newValue < min) {
      onMinReached();
    } else {
      setValue(newValue);
      onChange(newValue);
    }
  };

  const handleGlobalClick = () => {
    if (disabled && onClickWhenDisabled) {
      onClickWhenDisabled();
    }
  };

  return (
    <div
      className={`${styles.counter} ${className} ${styles[size]} ${
        disabled ? styles.disabled : ''
      }`}
      onClick={handleGlobalClick}
    >
      <span data-testid="value" className={styles.label}>{value}</span>
      <div className={styles.actions}>
        <span
          className={`${styles.increase} ${value === max ? styles.maxReached : ''}`}
          onClick={value !== max ? increaseCounter : onMaxReached}
          data-cy="increment"
          data-testid="increment"
        >
          +
        </span>
        <span
          className={styles.decrease}
          style={{ borderColor: disabled ? Colors.greyDark : Colors.black }}
          onClick={value !== min ? decreaseCounter : onMinReached}
          data-cy="decrement"
          data-testid="decrement"
        >
          -
        </span>
      </div>
    </div>
  );
};

export { NumberInput };
