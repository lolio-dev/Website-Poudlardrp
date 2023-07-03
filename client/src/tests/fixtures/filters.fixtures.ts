import { Filter } from '../../types/logic/Filter';

export const singleFilter: Filter = {
  label: 'single filter',
  name: 'single',
  id: 'single',
  onChange: () => {},
};

export const multipleFilters: Filter[] = [
  {
    label: 'first filter',
    name: 'first',
    id: 'first',
    onChange: () => {},
  },
  {
    label: 'second filter',
    name: 'second',
    id: 'second',
    onChange: () => {},
  },
];
