import { Filter } from './Filter';

export type FilterGroup = {
  title: string;
  filters: Filter[];
  height: number;
  type: 'checkbox' | 'radio';
};
