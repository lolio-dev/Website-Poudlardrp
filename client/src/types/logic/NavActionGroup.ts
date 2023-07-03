import { NavAction } from './NavAction';

export type NavActionGroup = {
  [key: string]: {
    actions: NavAction[];
  };
};
