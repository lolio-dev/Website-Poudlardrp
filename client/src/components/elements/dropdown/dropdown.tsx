import { ReactElement, useState, FunctionComponent, CSSProperties, useEffect } from 'react';
import { useTranslation } from 'react-multi-lang';
import { Link } from 'react-router-dom';

import { NavAction } from '../../../types/logic/NavAction';
import { NavLink } from '../../../types/logic/NavLink';

import styles from './dropdown.module.scss';

type Props = {
  links: NavLink[] | NavAction[];
  fref: any;
  label: string;
  subtitle?: string;
  icon?: ReactElement<any, any>;
  minWidth?: number;
  onNav?: () => void;
  className?: string;
};

export const Dropdown: FunctionComponent<Props> = ({
  links,
  fref,
  label,
  icon,
  minWidth,
  onNav,
  className = '',
}) => {
  const [isOpen, toggleDropdown] = useState(false);

  const t = useTranslation();

  const customization: CSSProperties = {
    minWidth,
  };

  useEffect(() => {
    if (fref.current) {
      fref.current[label] = closeDropdown;
    }
  });

  const closeDropdown = () => {
    toggleDropdown(false);
  };

  return (
    <div className={`${styles.dropdown} ${className}`} style={customization}>
      <button
        className={`${styles.dropdownButton} ${icon ? styles.icon : ''}`}
        onClick={() => toggleDropdown(!isOpen)}
      >
        {!icon ? label : icon}
      </button>
      <div className={`dropdownContent ${styles.dropdownContent} ${isOpen ? styles.open : ''}`}>
        {links.map((link, index) => {
          if ((link as NavLink).href) {
            const ref = link as NavLink;

            return (
              <Link key={index} className={styles.link} to={ref.href} onClick={onNav}>
                {t(ref.label)}
              </Link>
            );
          } else {
            const action = link as NavAction;

            return (
              <button key={index} className={styles.link} onClick={action.acion}>
                {t(action.label)}
              </button>
            );
          }
        })}
      </div>
    </div>
  );
};
