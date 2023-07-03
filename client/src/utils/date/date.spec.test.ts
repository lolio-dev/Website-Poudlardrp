import { DateDiff } from '../../types/logic/DateDiff';
import { getDateDiff } from './date';

describe('date utils', () => {
  it('should work with negatives values', () => {
    expect(() => getDateDiff(-1646329516119, -1646329515119)).not.toThrowError();
  });
  it('should return 0 secondes when dates are equals', () => {
    const result: DateDiff = getDateDiff(0, 0);
    expect(result.diff).toEqual(0);
    expect(result.unit).toEqual('date.seconds');
  });
  it('should return n seconds', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1646329515119);
    expect(result.diff).toEqual(1);
    expect(result.unit).toEqual('date.seconds');
  });
  it('should return n minutes', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1646328515119);
    expect(result.diff).toEqual(17);
    expect(result.unit).toEqual('date.minutes');
  });
  it('should return n hours', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1646318515119);
    expect(result.diff).toEqual(3);
    expect(result.unit).toEqual('date.hours');
  });
  it('should return n days', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1645318515119);
    expect(result.diff).toEqual(12);
    expect(result.unit).toEqual('date.days');
  });
  it('should return n months', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1635318515119);
    expect(result.diff).toEqual(4);
    expect(result.unit).toEqual('date.months');
  });
  it('should return n yaers', () => {
    const result: DateDiff = getDateDiff(1646329516119, 1535318515119);
    expect(result.diff).toEqual(4);
    expect(result.unit).toEqual('date.years');
  });
});
