const ratioCm = 0.036;

export const mmToPt = (mm: number): number => {
  return mm / (ratioCm * 10);
};
