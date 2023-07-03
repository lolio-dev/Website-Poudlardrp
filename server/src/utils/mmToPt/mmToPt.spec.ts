import { mmToPt } from './mmToPt';

describe('mm to pt', () => {
  it('should convert milimeters to pt', () => {
    expect(mmToPt(1)).toBeGreaterThan(2.6);
    expect(mmToPt(1)).toBeLessThan(2.8);
  });
});
