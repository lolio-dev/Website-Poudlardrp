import { FunctionComponent, useRef, useState } from 'react';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

import { FilterGroup } from '../../../types/logic/FilterGroup';

import styles from './filter.module.scss';

type Props = {
  filterGroup: FilterGroup;
};

export const Filter: FunctionComponent<Props> = ({ filterGroup }) => {
  const filtersHTML = useRef(null as any);
  const [isOpen, setOpen] = useState(false);

  const handleFilters = () => {
    const isOpened = filtersHTML.current.style.height === `${filterGroup.height}px`;
    filtersHTML.current.style.height = isOpened ? '0px' : `${filterGroup.height}px`;
    setOpen(!isOpened);
  };

  return (
    <div className={styles.filter_category}>
      <div className={styles.title} onClick={() => handleFilters()}>
        <h3>{filterGroup.title}</h3>
        {isOpen ? <IoIosArrowDown></IoIosArrowDown> : <IoIosArrowUp></IoIosArrowUp>}
      </div>
      <div className={styles.filters} ref={filtersHTML}>
        {filterGroup.filters.map((f, i) => (
          <div className={styles.filter} key={i} data-testid="filter">
            <label htmlFor={f.id}>
              {f.label}
              <input type={filterGroup.type} id={f.id} name={f.name} onChange={f.onChange} />
              <span className={styles.checkmark}></span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
