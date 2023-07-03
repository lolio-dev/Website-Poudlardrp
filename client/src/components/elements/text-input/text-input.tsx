import { FunctionComponent, HTMLInputTypeAttribute } from 'react';

import styles from './text-input.module.scss';

type Props = {
  id: string;
  label: string;
  type: HTMLInputTypeAttribute;
  onChange: (email: any) => void;
  defaultValue?: string;
  className?: string;
};

export const TextInput: FunctionComponent<Props> = ({
  id,
  label,
  type,
  onChange,
  defaultValue,
  className = '',
}) => {
  return (
    <div className={`${styles.field} ${className}`}>
      <input
        className={styles.input}
        type={type}
        placeholder={label}
        id={id}
        onChange={onChange.bind(this)}
        defaultValue={defaultValue}
      />
      <span className={styles.bar}></span>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};
