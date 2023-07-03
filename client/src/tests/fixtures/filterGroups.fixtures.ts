import { FilterGroup } from '../../types/logic/FilterGroup';
import { multipleFilters } from './filters.fixtures';

export const checkboxFilterGroup: FilterGroup = {
  title: 'checkboxFilterGroup',
  height: 100,
  type: 'checkbox',
  filters: multipleFilters,
};

export const radioFilterGroup: FilterGroup = {
  title: 'radioFilterGroup',
  height: 100,
  type: 'radio',
  filters: multipleFilters,
};
