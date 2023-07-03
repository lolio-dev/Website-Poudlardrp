import { DateDiff } from '../../types/logic/DateDiff';

export const getDateDiff = (date1: number, date2: number): DateDiff => {
  const diff = Math.abs(date1 - date2) / 1000;

  if (diff < 60) {
    return { diff: Math.round(diff), unit: 'date.seconds' };
  } else if (diff < 3600) {
    return { diff: Math.round(diff / 60), unit: 'date.minutes' };
  } else if (diff < 86400) {
    return { diff: Math.round(diff / 3600), unit: 'date.hours' };
  } else if (diff < 2628000) {
    return { diff: Math.round(diff / 86400), unit: 'date.days' };
  } else if (diff < 31536000) {
    return { diff: Math.round(diff / 2628000), unit: 'date.months' };
  } else {
    return { diff: Math.round(diff / 31536000), unit: 'date.years' };
  }
};
